import React from 'react';
import { connect } from 'react-redux';
import ResultRow from './ResultRow';
import constants from '../constants';
import FetchRound from '../classes/FetchRound';

const ResultRows = (props) => {
  const maxPossibleLinks = constants.FETCH_LINKS_HERE_LIMIT * constants.WALK_WIDTH;
  const rows = [];
  const allRounds = props.rounds;
  const tagClickCallback = props.tagClick;
  allRounds.forEach(function showResultRow(roundData) {
    const nextround = roundData.round + 1;
    let nextRoundData = null;
    if (nextround < allRounds.length) {
      nextRoundData = allRounds[nextround];
    }
    const firstRow = roundData.round === 0;
    const lastRow = typeof nextRoundData === 'undefined';
    if (roundData.pagesFetched.length > 0 || roundData.pagesToFetch.length > 0) {
      rows.push(
        <ResultRow
          key={roundData.round}
          roundData={roundData}
          nextRoundData={nextRoundData}
          firstRow={firstRow}
          lastRow={lastRow}
          maxPossibleLinks={maxPossibleLinks}
          tagClick={tagClickCallback}
        />,
      );
    }
  });
  return (
    <div id="result-rows">
      { rows }
    </div>
  );
};

ResultRows.propTypes = {
  rounds: React.PropTypes.arrayOf(FetchRound),
  tagClick: React.PropTypes.func.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    rounds: state.rounds,
  };
};


const Container = connect(mapStateToProps)(ResultRows);

export default Container;

