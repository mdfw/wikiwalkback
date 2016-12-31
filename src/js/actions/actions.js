import fetchWikis from '../actions/fetchWikis';
import constants from '../constants';

const SEARCH_AREA_LOC = 'SEARCH_AREA_LOC';
const searchAreaLoc = function searchAreaLoc(location) {
  return {
    type: SEARCH_AREA_LOC,
    location: location,
  };
};

const SEARCH_INPUT = 'SEARCH_INPUT';
const searchInput = function searchInput(input, depth) {
  return {
    type: SEARCH_INPUT,
    input: input,
    depth: depth,
  };
};

const FINAL_PAGE = 'FINAL_PAGE';
const finalPage = function finalPage(finalLink) {
  return {
    type: FINAL_PAGE,
    finalLink: finalLink,
  };
};

const UPDATE_WALK_STATUS = 'UPDATE_WALK_STATUS';
const updateWalkStatus = function updateWalkStatus(status) {
  return {
    type: UPDATE_WALK_STATUS,
    status: status,
  };
};

const END_WALK = 'END_WALK';
const endWalk = function endWalk(finalLink) {
  return function endingWalk(dispatch) {
    dispatch(
      updateWalkStatus(constants.WALK_STATUS_END),
    );
    dispatch(
      finalPage(finalLink),
    );
  };
};

const WALK_ERROR = 'WALK_ERROR';
const walkError = function walkError(errorMessage) {
  return {
    type: WALK_ERROR,
    errorMessage: errorMessage,
  };
};

const UPDATE_ROUND = 'UPDATE_ROUND';
const updateRound = function updateRound(round
  , status = null
  , pagesToFetch = null
  , pageFetched = null) {
  return {
    type: UPDATE_ROUND,
    round: round,
    status: status,
    pagesToFetch: pagesToFetch,
    pageFetched: pageFetched,
  };
};

const START_FETCH = 'START_FETCH';
const startFetch = function startFetch(round, pagesToFetch) {
  return function startingFetch(dispatch) {
    dispatch(
      updateRound(round, constants.ROUND_STATUS_FETCHING),
    );
    dispatch(
      fetchWikis.dispatchFetches(round, pagesToFetch),
    );
  };
};


exports.SEARCH_AREA_LOC = SEARCH_AREA_LOC;
exports.searchAreaLoc = searchAreaLoc;

exports.SEARCH_INPUT = SEARCH_INPUT;
exports.searchInput = searchInput;

exports.FINAL_PAGE = FINAL_PAGE;
exports.finalPage = finalPage;

exports.UPDATE_WALK_STATUS = UPDATE_WALK_STATUS;
exports.updateWalkStatus = updateWalkStatus;

exports.END_WALK = END_WALK;
exports.endWalk = endWalk;

exports.WALK_ERROR = WALK_ERROR;
exports.walkError = walkError;

exports.UPDATE_ROUND = UPDATE_ROUND;
exports.updateRound = updateRound;

exports.START_FETCH = START_FETCH;
exports.startFetch = startFetch;
