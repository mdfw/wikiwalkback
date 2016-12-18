
const EXAMPLE_CHANGE = 'EXAMPLE_CHANGE';
const exampleChange = function guessInputChange(changedInput) {
  return {
    type: EXAMPLE_CHANGE,
    changedInput: changedInput,
  };
};

exports.EXAMPLE_CHANGE = EXAMPLE_CHANGE;
exports.exampleChange = exampleChange;
