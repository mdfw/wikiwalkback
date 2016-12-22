const SEARCH_AREA_LOC = 'SEARCH_AREA_LOC';
const searchAreaLoc = function searchAreaLoc(location) {
  return {
    type: SEARCH_AREA_LOC,
    location: location,
  };
};

exports.SEARCH_AREA_LOC = SEARCH_AREA_LOC;
exports.searchAreaLoc = searchAreaLoc;
