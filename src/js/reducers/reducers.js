const actions = require('../actions/actions');
const constants = require('../constants');
const classes = require('../wikiClasses');
const fetchWikis = require('../actions/fetchWikis');


class FetchRound {
  constructor(round = 0, status = constants.ROUND_STATUS_NONE) {
    this.round = round;
    this.status = status;
    this.pageIdsToFetch = [];
    this.pages = [];
  }
}

// Creating a new state
function createNewState() {
  const r0 = new FetchRound(0);
  const r1 = new FetchRound(1);
  const r2 = new FetchRound(2);  
  return {
    currentInput: '',
    searchLocation: constants.SEARCH_AREA_LOC_MID,
    rounds: [r0, r1, r2],
  };
}

const findRound = function findRound(rounds, roundToFind) {
  console.log('::findRound2:roundToFind: ' + roundToFind + ' rounds: ' );
  console.dir(rounds);
  const filteredRounds = rounds.filter(function filterRounds (thisround) {
    console.log('thisRound.round: ' +thisround.round + '  roundToFind: ' + roundToFind);
    return thisround.round === roundToFind;
  });
  console.log('::findRound2:filteredRounds: ' );
  console.dir(filteredRounds);

  if (filteredRounds.length > 0) {
    return filteredRounds[0];
  }
  console.log('ERROR ::findRound2: Did not find round returning null');
  return null;

}
// The main reducer. Looks for the action and makes decisions.
const walkbackReducer = function walkbackReducer(state = createNewState(), action) {
  console.log('::walkbackReducer:Reducing: ' + action.type);
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
    case fetchWikis.FETCH_PAGE_SUCCESS: {
      console.log('::walkbackReducer:case3:round: ', action.round);
      const foundRound = findRound(state.rounds, action.round);
      if (foundRound) {
        const roundToUpdate = Object.assign(new FetchRound(action.round), foundRound);
        console.log('::walkbackReducer:case3:found a roundToUpdate: ');
        console.dir(foundRound);
        console.log('    concatting: ');
        console.dir(action.page);
        roundToUpdate.pages = roundToUpdate.pages.concat(action.page);
        console.log('::walkbackReducer:roundToUpdate (post concat): ');
        console.dir(roundToUpdate);
        const newstate = Object.assign({}, state);
        newstate.rounds[action.round] = roundToUpdate;
        console.log('::walkbackReducer:newstate');
        console.dir(newstate);
        return newstate;
      }
    }
    default:
      console.log('::walkbackReducer:default return from reducer');
      return state;
  }
};

exports.walkbackReducer = walkbackReducer;

