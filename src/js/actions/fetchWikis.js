import actions from '../actions/actions';
import constants from '../constants';

const fetch = require('isomorphic-fetch');
const Wiki = require('../wikiClasses');

const parseThumbnail = function parseThumbnail(pagedata) {
  const thumb = pagedata.thumbnail;
  if (thumb) {
    return new Wiki.Thumbnail(thumb.source, thumb.width, thumb.height);
  }
  return null;
};

const parseLinksHere = function parseLinksHere(pagedata) {
  const linkshere = pagedata.linkshere;
  if (!linkshere) {
    return [];
  }
  const links = [];
  linkshere.forEach(function linkshereparse(link) {
    if (link.ns === 0) {
      const newl = new Wiki.LinkIdentifier(link.pageid, link.title);
      links.push(newl);
    }
  });
  return links;
};

const parsePage = function parsepage(pagedata) {
  const newpage = new Wiki.Page(pagedata.pageid, pagedata.title);
  newpage.pageimage = pagedata.pageimage;
  newpage.thumbnail = parseThumbnail(pagedata);
  newpage.linkshere = parseLinksHere(pagedata);
  return newpage;
};

const parseFetchedData = function parseFetchedData(data, pageid = null, pagename = null) {
  const allpages = data.query.pages;
  for (const key in allpages) {         // eslint-disable-line no-restricted-syntax
    if (allpages.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
      if (key === -1) {
        break;
      }
      const page = allpages[key];
      if ((pageid === page.pageid || pagename.toLowerCase() === page.title.toLowerCase())
            && page.ns === 0) {
        const parsedPage = parsePage(page);
        return parsedPage;
      }
    }
  }
  return null;
};

const fetchPage = function fetchPage(round, pageid = null, pagename = null) {
  return function fetchPageDispatch(dispatch) {
    const lhlimit = constants.FETCH_LINKS_HERE_LIMIT > 0 ? constants.FETCH_LINKS_HERE_LIMIT : 10;
    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=linkshere|info|pageimages&lhlimit=${lhlimit}&lhnamespace=0&format=json&origin=*&`;
    if (pageid && pageid.length !== 0) {
      url = `${url}pageids=${pageid}`;
    } else if (pagename.length !== 0) {
      url = `${url}titles=${pagename}`;
    }
    return fetch(url).then(function returnFetchResponse(response) {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function parseJsonResponse(data) {
      const parsed = parseFetchedData(data, pageid, pagename);
      return parsed;
    })
    .then(function parseFetchedPage(page) {
      return dispatch(
        actions.updateRound(round, null, null, page),
      );
    })
    .catch(function processFetchError(error) {
      console.log('Error: ');
      console.dir(error);
      return dispatch(
        actions.walkError(error),
      );
    });
  };
};

const dispatchFetches = function dispatchFetches(round, pageIdentifiers) {
  return function fetchMultiple(dispatch) {
    pageIdentifiers.forEach(function fetchThisPage(pageIdentifier) {
      if (pageIdentifier.linkId && pageIdentifier.linkId.length > 0) {
        dispatch(
          fetchPage(round, pageIdentifier.linkId),
        );
      } else if (pageIdentifier.linkTitle && pageIdentifier.linkTitle.length > 0) {
        dispatch(
          fetchPage(round, null, pageIdentifier.linkTitle),
        );
      }
    });
  };
};

exports.fetchPage = fetchPage;
exports.dispatchFetches = dispatchFetches;
