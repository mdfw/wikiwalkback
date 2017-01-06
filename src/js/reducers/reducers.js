import FetchRound from '../classes/FetchRound';
import actions from '../actions/actions';
import constants from '../constants';

// Creating a new state
function createNewState() {
  const newRounds = FetchRound.buildArrayOf(constants.WALK_DEPTH);
  return {
    wikipediaSubsite: 'en',
    currentInput: '',
    searchReady: false,
    walkStatus: constants.WALK_STATUS_INPUT,
    walkError: null,
    rounds: newRounds,
    finalPageLink: null,
    resultsLastSearchTerm: null,
    resultsLastSearchSteps: null,
  };
}

// The main reducer. Looks for the action and makes decisions.
const walkbackReducer = function walkbackReducer(state = createNewState(), action) {
  switch (action.type) {
    case actions.SEARCH_INPUT: {
      const newstate = Object.assign({}, state);
      if (action.input) {
        newstate.currentInput = action.input;
        newstate.searchReady = action.input.length > 0;
      }
      if (action.depth &&
        action.depth <= constants.WALK_DEPTH_MAX &&
        action.depth >= constants.WALK_DEPTH_MIN) {
        if (action.depth !== newstate.rounds.length) {
          newstate.rounds = FetchRound.buildArrayOf(action.depth);
        }
      }
      return newstate;
    }
    case actions.RESULTS_PARAMS: {
      if (action.searchTerm === state.resultsLastSearchTerm &&
        action.searchSteps === state.resultsLastSearchSteps) {
        return state;
      }
      const newstate = Object.assign({}, state);
      if (action.searchTerm) {
        newstate.resultsLastSearchTerm = action.searchTerm;
      }
      if (action.searchSteps) {
        if (action.searchSteps !== newstate.resultsLastSearchSteps) {
          newstate.resultsLastSearchSteps = action.searchSteps;
        }
      }
      return newstate;
    }
    case actions.UPDATE_WALK_STATUS: {
      const newstate = Object.assign({}, state);
      newstate.walkStatus = action.status;
      return newstate;
    }
    case actions.WALK_ERROR: {
      const newstate = Object.assign({}, state);
      if (Object.prototype.toString.call(action.errorMessage).slice(8, -1) === 'String') {
        newstate.walkError = action.errorMessage;
      }
      if (Object.prototype.toString.call(action.errorMessage.response).slice(8, -1) === 'String') {
        newstate.walkError = action.errorMessage.response;
      }
      newstate.walkStatus = constants.WALK_STATUS_ERROR;
      return newstate;
    }
    case actions.FINAL_PAGE: {
      const newstate = Object.assign({}, state);
      newstate.finalPageLink = action.finalLink;
      return newstate;
    }
    case actions.UPDATE_ROUND: {
      const foundRound = state.rounds[action.round];
      if (foundRound) {
        const updatedRound = FetchRound.copyAndUpdate(foundRound,
          action.status,
          action.pagesToFetch,
          action.pageFetched,
        );
        const newstate = Object.assign({}, state);
        const newRounds = newstate
          .rounds.slice(0, action.round)
          .concat(updatedRound)
          .concat(newstate.rounds.slice(action.round + 1));
        newstate.rounds = newRounds;
        return newstate;
      }
      break;
    }
    case actions.RESET_WALKBACK: {
      const newstate = createNewState();
      return newstate;
    }
    default:
      return state;
  }
  return state;
};

exports.walkbackReducer = walkbackReducer;

