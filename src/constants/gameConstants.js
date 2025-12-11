// Game board configuration
export const BOARD_SIZE = 6;
export const MAX_CELL = BOARD_SIZE * BOARD_SIZE;

// Animation timings (in milliseconds)
export const ANIMATION_TIMINGS = {
  STEP_DURATION: 180,
  PATH_CLEAR_DELAY: 350,
  TIP_DISPLAY_DURATION: 1800,
  TIP_BOUNCE_DURATION: 1500,
  TRANSITION_DELAY: 400,
  GAME_OVER_DELAY: 500,
};

// Note: Special positions are now loaded dynamically from travel_data.csv
// Wormhole positions (rewards): Fast travel forward to target cell
// Asteroid positions (penalties): Hit by asteroid, pushed backward to target cell
// Each cell can have Special_Effect (wormhole/asteroid) and Target_Cell columns

// Game result types
export const GAME_RESULT = {
  WIN: 'win',
  LOSE: 'lose',
};

// Activity types to exclude from visited locations
export const EXCLUDED_ACTIVITIES = ['traveling', 'wormhole', 'Asteroid'];
