exports.ROUND_STATUS_NONE = 'round_none';
exports.ROUND_STATUS_SETLINKS = 'round_setlinks';
exports.ROUND_STATUS_START = 'round_start';
exports.ROUND_STATUS_FETCHING = 'round_fetching';
exports.ROUND_STATUS_COMPLETE = 'round_complete';

// Gathering input - set at launch
exports.WALK_STATUS_INPUT = 'walk_gather_input';

// START WALK - set by the search container
// The subscriber listens for this and sets STATUS_RUNNING
exports.WALK_STATUS_START = 'walk_start';

// Preparing for walk - set by subscriber when preparing walk.
exports.WALK_STATUS_PREPARING = 'walk_prepare';

// Walk running - set by subscriber when walk starts
exports.WALK_STATUS_RUNNING = 'walk_running';

// Walk Picking final - the walk engine is picking the final page.
exports.WALK_PICK_FINAL = 'walk_picking_final';

// Walk ended
exports.WALK_STATUS_END = 'walk_end';

// Error happened
exports.WALK_STATUS_ERROR = 'walk_error';

// walk_width_min controls the minimum number
// of links needed to go to the next round.
exports.WALK_WIDTH_MIN = 1;

// How many random links to follow per round.
exports.WALK_WIDTH = 3;

// How many rounds of fetching to run by default.
exports.WALK_DEPTH = 4;

// The maximum number of steps to a walk.
exports.WALK_DEPTH_MAX = 5;

// The minimum number of steps to a walk.
exports.WALK_DEPTH_MIN = 2;

// Controls the number of links the fetcher requests from Wikipedia
exports.FETCH_LINKS_HERE_LIMIT = 30;

/* Used in results */
exports.RESULTS_ROW_FIRST = 'first';
exports.RESULTS_ROW_PENULTIMATE = 'penultimate';
exports.RESULTS_ROW_LAST = 'last';
exports.RESULTS_ROW_OTHER = 'other';
