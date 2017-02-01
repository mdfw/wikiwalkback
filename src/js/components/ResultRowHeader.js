import React from 'react';
import constants from '../constants';


function joinArray(arr, between = ', ', last = ' and ') {
  /* A better joinArray function that allows treats the last item differently
    Based on http://stackoverflow.com/a/29234240
  */
  if (!arr) {
    return '';
  }
  let outStr = '';
  if (arr.length === 1) {
    outStr = arr[0];
  } else if (arr.length === 2) {
    // example: "bob and sam"
    outStr = arr.join(last);
  } else if (arr.length > 2) {
    // example: "bob, joe, and sam"
    outStr = arr.slice(0, -1).join(between) + last + arr.slice(-1);
  }
  return outStr;
}

/* Shows the header for each result row
 * "You searched for...
 */
class ResultsRowHeader extends React.Component {
  firstRow() {
    const stepNum = 'Step 1';
    let message = `You searched for "${joinArray(this.props.fetchedTitles)}."`;
    if (this.props.fetching) {
      message += ' Fetching now…';
    } else if (this.props.linkCount > 0) {
      const atLeast = this.props.linkCount === this.props.maxPossibleLinks ? ' (there may be more)' : '';
      message += ` There are at least ${this.props.linkCount}${atLeast} pages that link to the "${joinArray(this.props.fetchedTitles, '", "', '" and "')}" page:`;
    }
    return (
      <div>
        -{stepNum}-
        <br />
        {message}
        <div style={{ color: 'gray', fontSize: '0.5em', margin: '10px' }}>
          (Hint: click on any tag to start a new walk with that seed)
        </div>
      </div>
    );
  }
  otherRows() {
    const stepNum = this.props.rowPosition === constants.RESULTS_ROW_PENULTIMATE ? 'Final Step' : `Step ${this.props.rowNumber}`;
    let message = '';
    if (this.props.fetching) {
      message += `Fetching links to "${joinArray(this.props.fetchedTitles, '", "', '" or "')}"...`;
    } else if (this.props.linkCount > 0) {
      const atLeast = this.props.linkCount === this.props.maxPossibleLinks ? 'at least ' : '';
      message += ` I found ${atLeast}${this.props.linkCount} pages that link to "${joinArray(this.props.fetchedTitles, '", "', '" or "')}":`;
    }
    return (
      <div>
        -{stepNum}-
        <br />
        {message}
      </div>
    );
  }
  render() {
    const headerStyle = {
      fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
      float: 'none',
      textAlign: 'center',
      fontSize: '2em',
      marginBottom: '8px',
    };
    let message = '';
    switch (this.props.rowPosition) {
      case constants.RESULTS_ROW_LAST: {
        break;
      }
      case constants.RESULTS_ROW_FIRST: {
        message = this.firstRow();
        break;
      }
      default: {
        message = this.otherRows();
      }
    }
    return (
      <div style={headerStyle}>
        { message }
      </div>
    );
  }
}
ResultsRowHeader.propTypes = {
  rowNumber: React.PropTypes.number.isRequired,
  rowPosition: React.PropTypes.string.isRequired,
  fetchedTitles: React.PropTypes.arrayOf(React.PropTypes.string),
  linkCount: React.PropTypes.number,
  fetching: React.PropTypes.bool.isRequired,
  maxPossibleLinks: React.PropTypes.number.isRequired,
};


/* Shows the footer for each result row
 * "From those...
 */
const ResultsRowFooter = (props) => {
  let message = '';
  switch (props.rowPosition) {
    case constants.RESULTS_ROW_LAST: {
      break;
    }
    case constants.RESULTS_ROW_PENULTIMATE: {
      message = 'With that, I present you with the final page:';
      break;
    }
    default: {
      if (props.linkCount > 0 && props.toFetchTitles.length > 0) {
        message = `From those ${props.linkCount} pages, I picked ${props.toFetchTitles.length} random titles to move on to the next step: "${joinArray(props.toFetchTitles, '", "', '" and "')}"`;
      }
    }
  }
  const footerStyle = {
    fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
    float: 'none',
    textAlign: 'center',
    fontSize: '2em',
    marginTop: '8px',
  };
  return (
    <div style={footerStyle}>
      { message }
    </div>
  );
};

ResultsRowFooter.propTypes = {
  rowPosition: React.PropTypes.string.isRequired,
  linkCount: React.PropTypes.number,
  toFetchTitles: React.PropTypes.arrayOf(React.PropTypes.string),
};

exports.ResultsRowHeader = ResultsRowHeader;
exports.ResultsRowFooter = ResultsRowFooter;
