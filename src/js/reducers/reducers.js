const actions = require('../actions/actions');
const constants = require('../constants.js');

// Creating a new state
function createNewState() {
  return {
    currentInput: '',
    searchAreaHeightPercent: constants.SEARCH_AREA_HEIGHT_BASE_PERCENT,
  };
}

// The main reducer. Looks for the action and makes decisions.
const walkbackReducer = function walkbackReducer(state = createNewState(), action) {
  console.log('Reducing: ' + action.type);
  switch (action.type) {
    case actions.SEARCH_AREA_HEIGHT: {
      const newstate = Object.assign({}, state);
      newstate.searchAreaHeightPercent = action.searchHeight;
      console.log('Search height: ' + action.searchHeight + ' || Newstate: ');
      console.dir(newstate);
      return newstate;
    }
    default:
      return state;
  }
};

exports.walkbackReducer = walkbackReducer;

