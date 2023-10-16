import { Position } from '../types';

export const canWallBePlaced = (
  startPosition: Position,
  endPosition: Position,
  targetPosition: Position
): boolean => {
  return (
    !(
      startPosition.row === targetPosition.row &&
      startPosition.col === targetPosition.col
    ) ||
    !(
      endPosition.row === targetPosition.row &&
      endPosition.col === targetPosition.col
    )
  );
};
