const SEARCH_AREA_LOC = 'SEARCH_AREA_LOC';
const searchAreaLoc = function searchAreaLoc(location) {
  return {
    type: SEARCH_AREA_LOC,
    location: location,
  };
};

const SEARCH_INPUT = 'SEARCH_INPUT';
const searchInput = function searchInput(input) {
  return {
    type: SEARCH_INPUT,
    input: input,
  };
};

const BEGIN_WALK = 'BEGIN_WALK';
const beginWalk = function beginWalk() {
  return {
    type: BEGIN_WALK,
  };
};

exports.SEARCH_AREA_LOC = SEARCH_AREA_LOC;
exports.searchAreaLoc = searchAreaLoc;

exports.SEARCH_INPUT = SEARCH_INPUT;
exports.searchInput = searchInput;

exports.BEGIN_WALK = BEGIN_WALK;
exports.beginWalk = beginWalk;
