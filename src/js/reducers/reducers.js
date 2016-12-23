const actions = require('../actions/actions');
const constants = require('../constants.js');

// Creating a new state
function createNewState() {
  return {
    currentInput: '',
    searchLocation: constants.SEARCH_AREA_LOC_MID,
  };
}

// The main reducer. Looks for the action and makes decisions.
const walkbackReducer = function walkbackReducer(state = createNewState(), action) {
  console.log('Reducing: ' + action.type);
  console.dir(action);
  switch (action.type) {
    case actions.SEARCH_AREA_LOC: {
      const newstate = Object.assign({}, state);
      newstate.searchLocation = action.location;
      return newstate;
    }
    case actions.SEARCH_INPUT: {
      const newstate = Object.assign({}, state);
      newstate.currentInput = action.input;
      return newstate;
    }
    default:
      return state;
  }
};

exports.walkbackReducer = walkbackReducer;

