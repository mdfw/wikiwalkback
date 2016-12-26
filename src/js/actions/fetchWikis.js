const fetch = require('isomorphic-fetch');
const WikiClasses = require('../wikiClasses');

const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
const fetchPageSuccess = function fetchPageSuccess(page, round) {
  return {
    type: FETCH_PAGE_SUCCESS,
    page: page,
    round: round,
  };
};

const FETCH_PAGE_ERROR = 'FETCH_PAGE_ERROR';
const fetchPageError = function fetchPageError(error) {
  return {
    type: FETCH_PAGE_ERROR,
    error: error,
  };
};

const parseThumbnail = function parseThumbnail(pagedata) {
  const thumb = pagedata.thumbnail;
  if (thumb) {
    return new WikiClasses.WikiThumbnail(thumb.source, thumb.width, thumb.height);
  }
  return null;
};

const parseLinksHere = function parseLinksHere(pagedata) {
  const links = [];
  const linkshere = pagedata.linkshere;
  linkshere.forEach(function linkshereparse(link) {
    if (link.ns === 0) {
      const newl = new WikiClasses.WikiPageLinksHere(link.pageid, link.title);
      links.push(newl);
    }
  });
  return links;
};

const parsePage = function parsepage(pagedata) {
      console.log('::parsePage: ');
      console.dir(pagedata);
  const newpage = new WikiClasses.WikiPage(pagedata.pageid, pagedata.title);
  newpage.pageimage = pagedata.pageimage;
  newpage.thumbnail = parseThumbnail(pagedata);
  newpage.linkshere = parseLinksHere(pagedata);
      console.log('::parsePage: parsedPage:');
      console.dir(pagedata);  
  return newpage;
};

const parseFetched = function parseFetched(data, pageid = null, pagename = null) {
  const allpages = data.query.pages;
  
  for (var key in allpages) {
    if (allpages.hasOwnProperty(key)) {
      if (key === -1) {
        break;
      }
      const page = allpages[key];
      console.log('::ParseFetched: pageid: ' + pageid + ' pagename: ' + pagename + 'Page: ');
      console.dir(page);
      if ((pageid === page.pageid || pagename.toLowerCase() === page.title.toLowerCase()) && page.ns === 0) {
        const parsedPage = parsePage(page);
        console.log('::ParseFetched::parsedPage: ' + parsedPage);
        return parsedPage;
      }
    }
  return null;
  }
};

const fetchPage = function fetchPage(pageid = null, pagename = null, round) {
  return function (dispatch) {
    let url = 'https://en.wikipedia.org/w/api.php?action=query&prop=linkshere|info|pageimages&format=json&origin=*&';
    if (pageid && pageid.length !== 0) {
      url = url + 'pageids=' + pageid;
    } else if (pagename.length != 0) {
      url = url + 'titles=' + pagename;
    }
    console.log('fetching url: ' + url);
    return fetch(url).then(function (response) {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        console.log('::fetchPage: fetch error: ');
        console.dir(error);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function (response) {
      console.log('::fetchPage:response: ' + response);
      return response.json();
    })
    .then(function(data) {
      console.log('::fetchPage:data from fetch (pageid ' + pageid + ')  (pagename ' + pagename + '): ');
      console.dir(data);
      const parsed = parseFetched(data, pageid, pagename);
      console.log('::fetchPage:Parsed data: ');
      console.dir(parsed);
      return parsed;
    })
    .then(function (page) {
      console.log('round: ' + round + 'page: ' + page);
      console.dir(page);
      return dispatch(
        fetchPageSuccess(page, round)
      );
    })
    .catch(function (error) {
      //TODO: We don't actually do anything with this error.
      console.log('Error: ');
      console.dir(error);
      return dispatch(
        fetchPageError(error)
      );
    });
  };
};

exports.FETCH_PAGE_SUCCESS = FETCH_PAGE_SUCCESS;
exports.FETCH_PAGE_ERROR = FETCH_PAGE_ERROR;
exports.fetchPage = fetchPage;
