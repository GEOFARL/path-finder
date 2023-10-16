import { calculateValue, shufflePositions } from '../utils';

export const DEFAULT_NUMBER_OF_ROWS = 3;
export const DEFAULT_NUMBER_OF_COLS = 6;

export const [DEFAULT_START_POSITION, DEFAULT_END_POSITION] = shufflePositions(
  calculateValue(DEFAULT_NUMBER_OF_ROWS),
  calculateValue(DEFAULT_NUMBER_OF_COLS)
);

export const IS_ANIMATION_ON = true;
