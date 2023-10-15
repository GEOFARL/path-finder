import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectWalls } from '../app/features/board/boardSlice';

export default function useIsWall() {
  const walls = useSelector(selectWalls);

  return useCallback(
    (row: number, col: number) =>
      walls.some((wallPos) => wallPos.row === row && wallPos.col === col),
    [walls]
  );
}
