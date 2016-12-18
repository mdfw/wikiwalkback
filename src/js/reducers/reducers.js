const actions = require('../actions/actions');

// Creating a new state
function createNewState() {
  return {
    currentInput: '',
  };
}

// The main reducer. Looks for the action and makes decisions.
const exampleReducer = function exampleReducer(state = createNewState(), action) {
  switch (action.type) {
    case actions.EXAMPLE_CHANGE: {
      const newstate = Object.assign({}, state);
      newstate.currentInput = action.changedInput;
      return newstate;
    }
    default:
      return state;
  }
};

exports.exampleReducer = exampleReducer;

