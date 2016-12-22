const SEARCH_AREA_HEIGHT = 'SEARCH_AREA_HEIGHT';
const searchAreaHeight = function searchAreaHeight(height) {
  return {
    type: SEARCH_AREA_HEIGHT,
    searchHeight: height,
  };
};

exports.SEARCH_AREA_HEIGHT = SEARCH_AREA_HEIGHT;
exports.searchAreaHeight = searchAreaHeight;
