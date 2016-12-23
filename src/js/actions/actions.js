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

exports.SEARCH_AREA_LOC = SEARCH_AREA_LOC;
exports.searchAreaLoc = searchAreaLoc;

exports.SEARCH_INPUT = SEARCH_INPUT;
exports.searchInput = searchInput;
