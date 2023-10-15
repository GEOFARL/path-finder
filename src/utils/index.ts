import { Position } from '../types';

export const calculateValue = (val: number) => {
  if (val <= 6) return 4 + val;
  else if (val <= 10) return 10 + 5 * (val - 6);
  else if (val <= 12) return 30 + 10 * (val - 10);
  else return 50 + 25 * (val - 12);
};

export const getDefaultEndPosition = (
  rows: number,
  cols: number,
  startingPosition: Position
): Position => {
  let row = Math.floor(Math.random() * rows);
  let col = Math.floor(Math.random() * cols);

  while (row === startingPosition.row && col === startingPosition.col) {
    row = Math.floor(Math.random() * rows);
    col = Math.floor(Math.random() * cols);
  }

  return {
    row,
    col,
  };
};
