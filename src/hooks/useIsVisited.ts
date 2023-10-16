import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectVisitedPositions } from '../app/features/board/boardSlice';

export default function useIsVisited() {
  const visitedPositions = useSelector(selectVisitedPositions);

  return useCallback(
    (row: number, col: number) =>
      visitedPositions.some(
        (position) => position.row === row && position.col === col
      ),
    [visitedPositions]
  );
}
