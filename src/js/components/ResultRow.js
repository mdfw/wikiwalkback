import React from 'react';
import { TagCloud } from 'react-tagcloud';
import constants from '../constants';
import { ResultsRowHeader, ResultsRowFooter } from './ResultRowHeader';

/*
Each row needs:
1. The row number
2. The row status
3. The row position
4. The list of links associated with this row
5. The maximum links that could have been retrieved (for the header/footer
6. The list of links that were searched (fetched) for in this row
7. The list of links that will be searched for next time (or the final choice)
8. The boost amount
9. The tag onClick action
*/

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

const solidRendererEven = (tag, size, color) => (
  <span
    key={tag.key}
    style={{
      fontSize: `${size}em`,
      border: `1px solid ${color}`,
      borderRadius: '1em',
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'black',
    }}
  >{tag.value}</span>
);
const solidRendererOdd = (tag, size, color) => (
  <span
    key={tag.key}
    style={{
      fontSize: `${size}em`,
      border: `1px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'black',
    }}
  >{tag.value}</span>
);
const finalRenderer = (tag, size, color) => (
  <span
    key={tag.key}
    style={{
      fontSize: `${size * 3}em`,
      border: `1px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'black',
    }}
  >{tag.value}</span>
);
function isEven(n) {
  return n === parseFloat(n) ? !(n % 2) : void 0; // eslint-disable-line no-void
}

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
    this.props.tagClick(tag.value);
  }
  fetchedTitles() {
    if (!this.props.linksToFetchThis) {
      return [];
    }
    return ResultRow.linkTitles(this.props.linksToFetchThis);
  }
  toFetchTitles() {
    if (!this.props.linksToFetchNext) {
      return [];
    }
    return ResultRow.linkTitles(this.props.linksToFetchNext);
  }
  createTagsFromLinks() {
    const tags = [];
    const boost = this.props.tagSizeBoost;
    const rowNumber = this.props.rowNumber;
    const selectedLinks = this.props.linksToFetchNext;
    let keyindex = 1;
    this.props.linksHere.forEach(function toTag(link) {
      const found = selectedLinks.findIndex(function findlink(selectedLink) {
        return selectedLink.linkId === link.linkId || selectedLink.linkTitle === link.linkTitle;
      });
      const selectedBoost = found > -1 ? boost : 5;
      const key = `${rowNumber}-${keyindex}-${link.linkTitle}`;
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
    const tags = this.createTagsFromLinks();
    const fetching = this.props.rowStatus === constants.ROUND_STATUS_FETCHING;
    let renderer = isEven(this.props.rowNumber) ? solidRendererEven : solidRendererOdd;
    renderer = fetching ? fetchingRenderer : renderer;
    renderer = constants.RESULTS_ROW_LAST === this.props.rowPosition ? finalRenderer : renderer;
    const resultRowStyle = {
      fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
      float: 'none',
      textAlign: 'center',
    };
    return (
      <div className="resultRow" style={resultRowStyle}>
        <ResultsRowHeader
          rowNumber={this.props.rowNumber}
          rowPosition={this.props.rowPosition}
          linkCount={this.props.linksHere.length}
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
          rowPosition={this.props.rowPosition}
          linkCount={this.props.linksHere.length}
          toFetchTitles={this.toFetchTitles()}
          maxPossibleLinks={this.props.maxPossibleLinks}
        />
      </div>
    );
  }
}

ResultRow.propTypes = {
  rowNumber: React.PropTypes.number,
  rowStatus: React.PropTypes.string.isRequired,
  rowPosition: React.PropTypes.string.isRequired,
  linksHere: React.PropTypes.arrayOf(React.PropTypes.object),
  maxPossibleLinks: React.PropTypes.number.isRequired,
  linksToFetchThis: React.PropTypes.arrayOf(React.PropTypes.object),
  linksToFetchNext: React.PropTypes.arrayOf(React.PropTypes.object),
  tagSizeBoost: React.PropTypes.number.isRequired,
  tagClick: React.PropTypes.func.isRequired,
};
export default ResultRow;
