import React from 'react';
import { connect } from 'react-redux';
import ResultRow from './ResultRow';
import constants from '../constants';

const ResultsRowSeparator = () => {
  const sepStyle = {
    height: '40px',
  };
  return (
    <div style={sepStyle} />
  );
};

class ResultRows extends React.Component {
  static rowPosition(roundData, nextRoundData) {
    let rowPos = constants.RESULTS_ROW_OTHER;
    rowPos = roundData.round === 0 ? constants.RESULTS_ROW_FIRST : rowPos;
    if (!nextRoundData) {
      rowPos = constants.RESULTS_ROW_PENULTIMATE;
    }
    return rowPos;
  }
  static roundLinks(roundData) {
    let links = [];
    if (roundData) {
      links = roundData.pagesToFetch;
    }
    return links;
  }
  render() {
    const maxPossibleLinks = constants.FETCH_LINKS_HERE_LIMIT * constants.WALK_WIDTH;
    const rows = [];
    const allRounds = this.props.rounds;
    const tagClickCallback = this.props.tagClick;
    allRounds.forEach(function showResultRow(roundData) {
      const nextround = roundData.round + 1;
      const nextRoundData = nextround < allRounds.length ? allRounds[nextround] : null;
      let linksToFetchNext = [];
      if (nextRoundData) {
        linksToFetchNext = nextRoundData.pagesToFetch;
      }
      const linksHere = roundData.getFetchedLinks();
      const linksToFetchThis = roundData.pagesToFetch;
      if (roundData.pagesFetched.length > 0 || roundData.pagesToFetch.length > 0) {
        rows.push(
          <ResultRow
            key={roundData.round}
            rowNumber={roundData.round + 1}
            rowStatus={roundData.status}
            rowPosition={ResultRows.rowPosition(roundData, nextRoundData)}
            linksHere={linksHere}
            maxPossibleLinks={maxPossibleLinks}
            linksToFetchThis={linksToFetchThis}
            linksToFetchNext={linksToFetchNext}
            tagSizeBoost={25}
            tagClick={tagClickCallback}
          />,
        );
        const separatorKey = `${roundData.round}sep`;
        rows.push(
          <ResultsRowSeparator key={separatorKey} />,
        );
      }
    });
    if (this.props.finalPageLink) {
      const links = [this.props.finalPageLink];
      rows.push(
        <ResultRow
          key={this.props.rounds.length + 1}
          rowNumber={this.props.rounds.length + 2}
          rowStatus={constants.ROUND_STATUS_COMPLETE}
          rowPosition={constants.RESULTS_ROW_LAST}
          linksHere={links}
          maxPossibleLinks={maxPossibleLinks}
          linksToFetchThis={links}
          linksToFetchNext={links}
          tagSizeBoost={50}
          tagClick={this.props.finalClick}
        />,
      );
      const separatorKey = 'final-sep';
      rows.push(
        <ResultsRowSeparator key={separatorKey} />,
      );
    }
    return (
      <div id="result-rows">
        { rows }
      </div>
    );
  }
}

ResultRows.propTypes = {
  rounds: React.PropTypes.arrayOf(Object),
  tagClick: React.PropTypes.func.isRequired,
  finalClick: React.PropTypes.func.isRequired,
  finalPageLink: React.PropTypes.instanceOf(Object),
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    rounds: state.rounds,
    finalPageLink: state.finalPageLink,
  };
};


const Container = connect(mapStateToProps)(ResultRows);

export default Container;

