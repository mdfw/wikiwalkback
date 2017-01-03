import React from 'react';
import { TagCloud } from 'react-tagcloud';
import constants from '../constants';
import FetchRound from '../classes/FetchRound';

function joinArray(arr, between = ', ', last = ' and ') {
  if (!arr) {
    return '';
  }
  // Based on http://stackoverflow.com/a/29234240
  let outStr = '';
  if (arr.length === 1) {
    outStr = arr[0];
  } else if (arr.length === 2) {
    // joins all with "and" but no commas
    // example: "bob and sam"
    outStr = arr.join(last);
  } else if (arr.length > 2) {
    // joins all with commas, but last one gets ", and" (oxford comma!)
    // example: "bob, joe, and sam"
    outStr = arr.slice(0, -1).join(between) + last + arr.slice(-1);
  }
  return outStr;
}

class ResultsRowHeader extends React.Component {
  firstRow() {
    let message = 'Step 1: You searched for "' + joinArray(this.props.fetchedTitles) + '".';
    if (this.props.fetching) {
      message += ' Fetching now…';
    } else if (this.props.linkCount > 0) {
      const atLeast = this.props.linkCount === this.props.maxPossibleLinks ? 'at least ' : '';
      message = message + ' I found ' + atLeast + this.props.linkCount + ' pages that link to the "' + joinArray(this.props.fetchedTitles) + '" page:';
    }
    return message;
  }
  otherRows() {
    let message = this.props.lastRow ? 'Final Step: ' : 'Step ' + this.props.rowIndex + ': ';
    if (this.props.fetching) {
      message += 'Fetching links to ' + joinArray(this.props.fetchedTitles, ', ', ' or ');
    } else if (this.props.linkCount > 0) {
      const atLeast = this.props.linkCount === this.props.maxPossibleLinks ? 'at least ' : '';
      message += ' I found ' + atLeast + this.props.linkCount + ' pages that link to "' + joinArray(this.props.fetchedTitles, '", "', '" or "') + '":';
    }
    return message;
  }
  render() {
    const message = this.props.firstRow ? this.firstRow() : this.otherRows();
    return (
      <div>
        { message }
      </div>
    );
  }
}

ResultsRowHeader.propTypes = {
  rowIndex: React.PropTypes.number.isRequired,
  firstRow: React.PropTypes.bool.isRequired,
  lastRow: React.PropTypes.bool.isRequired,
  fetchedTitles: React.PropTypes.arrayOf(React.PropTypes.string),
  linkCount: React.PropTypes.number,
  fetching: React.PropTypes.bool.isRequired,
  maxPossibleLinks: React.PropTypes.number.isRequired,
};


const ResultsRowFooter = (props) => {
  let message = '';
  if (props.lastRow) {
    message = 'With that, I present you with the final page:';
  } else if (props.linkCount > 0 && props.toFetchTitles.length > 0) {
    message = 'From those ' + props.linkCount + ' pages, I picked ' + props.toFetchTitles.length + ' to move on ot the next step: ' + joinArray(props.toFetchTitles);
  }
  return (
    <div>
      { message }
    </div>
  );
};

ResultsRowFooter.propTypes = {
  lastRow: React.PropTypes.bool.isRequired,
  linkCount: React.PropTypes.number,
  toFetchTitles: React.PropTypes.arrayOf(React.PropTypes.string),
};

const fetchingRenderer = (tag, size, color) => (
  <span
    key={tag.key}
    style={{
      animation: 'blinker 3s linear infinite',
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${size}em`,
      border: `2px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'black',
    }}
  >{tag.value}</span>
);

const solidRenderer = (tag, size, color) => (
  <span
    key={tag.key}
    style={{
      fontSize: `${size}em`,
      border: `2px solid ${color}`,
      borderRadius: '1em',
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'black',
    }}
  >{tag.value}</span>
);

class ResultRow extends React.Component {
  static linkTitles(linkArray) {
    let titles = [];
    if (linkArray.length > 0) {
      titles = linkArray.map(function justTitles(link) {
        return link.linkTitle;
      });
    }
    return titles;
  }
  onClick(tag) {
    console.log('Clicked: ' + tag);
    console.dir(tag);
    this.props.tagClick(tag.value);
  }
  fetchedTitles() {
    if (!this.props.roundData || !this.props.roundData.pagesToFetch) {
      return [];
    }
    return ResultRow.linkTitles(this.props.roundData.pagesToFetch);
  }
  toFetchTitles() {
    if (!this.props.nextRoundData || !this.props.nextRoundData.pagesToFetch) {
      return [];
    }
    return ResultRow.linkTitles(this.props.nextRoundData.pagesToFetch);
  }
  createTagsFromLinks(links) {
    const tags = [];
    const roundData = this.props.roundData;
    let selectedLinks = [];
    if (this.props.nextRoundData) {
      selectedLinks = this.props.nextRoundData.pagesToFetch;
    }
    let keyindex = 1;
    links.forEach(function toTag(link) {
      const found = selectedLinks.findIndex(function findlink(selectedLink) {
        return selectedLink.linkId === link.linkId || selectedLink.linkTitle === link.linkTitle;
      });
      const selectedBoost = found > -1 ? 50 : 5;
      const key = roundData.round + '-' + keyindex + '-' + link.linkTitle;
      keyindex += 1;
      tags.push({
        value: link.linkTitle,
        count: selectedBoost,
        key: key,
      });
    });
    return tags;
  }
  render() {
    const rowLinks = this.props.roundData.getFetchedLinks();
    const tags = this.createTagsFromLinks(rowLinks);
    const fetching = this.props.roundData.status === constants.ROUND_STATUS_FETCHING;
    const renderer = fetching ? fetchingRenderer : solidRenderer;
    return (
      <div className="resultRow">
        <ResultsRowHeader
          rowIndex={this.props.roundData.round + 1}
          firstRow={this.props.firstRow}
          lastRow={this.props.lastRow}
          linkCount={rowLinks.length}
          fetching={fetching}
          fetchedTitles={this.fetchedTitles()}
          maxPossibleLinks={this.props.maxPossibleLinks}
        />
        <TagCloud
          tags={tags}
          minSize={1}
          maxSize={2}
          renderer={renderer}
          onClick={tag => this.onClick(tag)}
        />
        <ResultsRowFooter
          lastRow={this.props.lastRow}
          linkCount={rowLinks.length}
          fetching={fetching}
          toFetchTitles={this.toFetchTitles()}
          maxPossibleLinks={this.props.maxPossibleLinks}
        />
      </div>
    );
  }
}

ResultRow.propTypes = {
  roundData: React.PropTypes.instanceOf(FetchRound).isRequired,
  firstRow: React.PropTypes.bool.isRequired,
  lastRow: React.PropTypes.bool.isRequired,
  maxPossibleLinks: React.PropTypes.number.isRequired,
  nextRoundData: React.PropTypes.instanceOf(FetchRound),
  tagClick: React.PropTypes.func.isRequired,
};
export default ResultRow;
