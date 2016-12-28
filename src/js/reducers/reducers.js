const actions = require('../actions/actions');
const constants = require('../constants');

class FetchRound {
  constructor(round = 0, status = constants.ROUND_STATUS_NONE) {
    this.round = round;
    this.status = status;
    this.pagesToFetch = [];  // Filled with IdentifierToFetch
    this.pagesFetched = [];  // Filled with WikiPage
  }
  hasFetchedAll() {
    // TODO: May need to check for validity here?
    if (this.pagesToFetch.length === this.pagesFetched.length) {
      return true;
    }
    return false;
  }
  getAllLinks() {
    let theLinks = [];
    this.pagesFetched.forEach(function parsePagesFetched(page) {
      theLinks = theLinks.concat(page.linkshere);
    });
    return theLinks;
  }
  getRandomLinks(num = constants.WALK_WIDTH) {
    /* Randomization code by gonchuki from http://stackoverflow.com/a/5143910 */
    console.log('::FetchRound:getRandomLinks: getting ' + num + ' random links from ');
    const alllinks = this.getAllLinks();
    console.dir(alllinks);
    if (alllinks.length <= num) {
      console.log('::FetchRound:getRandomLinks: returning all links because alllinks length (' + alllinks.length + ') is less than num(' + num + ')');
      return alllinks;
    }
    const linkscopy = JSON.parse(JSON.stringify(alllinks));
    const randLinks = [];
    for (let i = 0; i < num; i++) {
      console.log('::FetchRound:getRandomLinks: getting ' + num + ' random links.');
      const rnd = Math.floor(Math.random() * linkscopy.length);
      const link = linkscopy.splice(rnd, 1)[0];
      randLinks.push(link);
    }
    return randLinks;
  }
  getFetchedLinks(random = 0) {
    console.log('::FetchRound:getFetchedLinks: getting ' + random + ' links.');
    if (random > 0) {
      console.log('::FetchRound:getFetchedLinks: getting ' + random + ' random links.');
      return this.getRandomLinks(random);
    }
    console.log('::FetchRound:getFetchedLinks: returning all links.');
    return this.getAllLinks();
  }
}

// Creating a new state
function createNewState() {
  const theRounds = [];
  for (let i = 0; i < constants.WALK_DEPTH; i++) {
    theRounds.push(new FetchRound(i));
  }
  return {
    currentInput: '',
    searchReady: false,
    searchLocation: constants.SEARCH_AREA_LOC_MID,
    walkStatus: constants.WALK_STATUS_INPUT,
    walkError: null,
    rounds: theRounds,
    finalPageLink: null,
  };
}

const updateRound = function updateRound(roundData, action) {
  const roundToUpdate = Object.assign(new FetchRound(action.round), roundData);
  if (action.status && action.status.length > 0) {
    roundToUpdate.status = action.status;
  }
  if (action.pagesToFetch && action.pagesToFetch.length > 0) {
    roundToUpdate.pagesToFetch = action.pagesToFetch;
  }
  if (action.pageFetched) {
    console.log('::updateRound:updateding PagesFetched');
    roundToUpdate.pagesFetched = roundToUpdate.pagesFetched.concat(action.pageFetched);
  }
  console.log('::updateRound:updated to: ' + JSON.stringify(roundToUpdate));
  return roundToUpdate;
};


// The main reducer. Looks for the action and makes decisions.
const walkbackReducer = function walkbackReducer(state = createNewState(), action) {
  console.log('::walkbackReducer:Reducing: ' + action.type + '  ' + JSON.stringify(action));
  switch (action.type) {
    case actions.SEARCH_AREA_LOC: {
      const newstate = Object.assign({}, state);
      newstate.searchLocation = action.location;
      return newstate;
    }
    case actions.SEARCH_INPUT: {
      const newstate = Object.assign({}, state);
      newstate.currentInput = action.input;
      newstate.searchReady = action.input.length > 0 ? true : false;
      return newstate;
    }
    case actions.UPDATE_WALK_STATUS: {
      console.log('::walkbackReducer:UPDATE_WALK_STATUS: ', action.status);
      const newstate = Object.assign({}, state);
      newstate.walkStatus = action.status;
      return newstate;
    }
    case actions.WALK_ERROR: {
      const newstate = Object.assign({}, state);
      newstate.walkError = action.errorMessage;
      newstate.walkStatus = constants.WALK_STATUS_ERROR;
      return newstate;
    }
    case actions.FINAL_PAGE: {
      const newstate = Object.assign({}, state);
      newstate.finalPageLink = action.finalLink;
      return newstate;
    }
    case actions.UPDATE_ROUND: {
      console.log('::walkbackReducer:UPDATE_ROUND:round: ', action.round);
      const foundRound = state.rounds[action.round];
      if (foundRound) {
        const updatedRound = updateRound(foundRound, action);
        const newstate = Object.assign({}, state);
        newstate.rounds[action.round] = updatedRound;
        console.log('::walkbackReducer:newstate');
        console.dir(newstate);
        return newstate;
      }
      break;
    }
    default:
      console.log('::walkbackReducer:default return from reducer');
      return state;
  }
  return state;
};

exports.walkbackReducer = walkbackReducer;


/*
const findRound = function findRound(rounds, roundToFind) {
  console.log('::findRound2:roundToFind: ' + roundToFind + ' rounds: ');
  console.dir(rounds);
  const filteredRounds = rounds.filter(function filterRounds(thisround) {
    console.log('thisRound.round: ' + thisround.round + ' roundToFind: ' + roundToFind);
    return thisround.round === roundToFind;
  });
  console.log('::findRound2:filteredRounds: ');
  console.dir(filteredRounds);

  if (filteredRounds.length > 0) {
    return filteredRounds[0];
  }
  console.log('ERROR ::findRound2: Did not find round returning null');
  return null;
};
*/
