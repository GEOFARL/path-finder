import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectPathPositions } from '../app/features/board/boardSlice';

export default function useIsPath() {
  const pathPositions = useSelector(selectPathPositions);

  return useCallback(
    (row: number, col: number) =>
      pathPositions.some(
        (position) => position && position.row === row && position.col === col
      ),
    [pathPositions]
  );
}
