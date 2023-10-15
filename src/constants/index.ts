import { Position } from '../types';
import { calculateValue, getDefaultEndPosition } from '../utils';

export const DEFAULT_NUMBER_OF_ROWS = 1;
export const DEFAULT_NUMBER_OF_COLS = 3;
export const DEFAULT_START_POSITION: Position = {
  row: Math.floor(Math.random() * calculateValue(DEFAULT_NUMBER_OF_ROWS)),
  col: Math.floor(Math.random() * calculateValue(DEFAULT_NUMBER_OF_COLS)),
};

export const DEFAULT_END_POSITION: Position = getDefaultEndPosition(
  calculateValue(DEFAULT_NUMBER_OF_ROWS),
  calculateValue(DEFAULT_NUMBER_OF_COLS),
  DEFAULT_START_POSITION
);
