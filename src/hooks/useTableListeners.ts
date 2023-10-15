import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {
  addWall,
  removeWall,
  setIsMousePressed,
} from '../app/features/board/boardSlice';

export default function useTableListeners(
  tableRef: React.MutableRefObject<HTMLTableElement | null>
) {
  const dispatch = useDispatch();
  const { startPosition, endPosition, walls } = useSelector(
    (state: RootState) => state.board
  );

  useEffect(() => {
    if (!tableRef.current) return;

    const isValid = (row: number, col: number) =>
      (row !== startPosition.row || col !== startPosition.col) &&
      (row !== endPosition.row || col !== endPosition.col);

    const handleMouseDown = (e: Event) => {
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }
      dispatch(setIsMousePressed(true));
      const row = +e.target.dataset['row']!;
      const col = +e.target.dataset['col']!;

      if (isValid(row, col)) {
        if (
          walls.some((wallPos) => wallPos.row === row && wallPos.col === col)
        ) {
          dispatch(removeWall({ row, col }));
        } else {
          dispatch(addWall({ row, col }));
        }
      }
    };

    const handleMouseUp = () => {
      dispatch(setIsMousePressed(false));
    };

    const handleMouseOverWindow = () => {
      dispatch(setIsMousePressed(false));
    };

    const handleMouseOverTable = (e: Event) => {
      e.stopPropagation();
    };

    const table = tableRef.current;

    window.addEventListener('mouseover', handleMouseOverWindow);
    table.addEventListener('mouseover', handleMouseOverTable);
    table.addEventListener('mousedown', handleMouseDown);
    table.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseover', handleMouseOverWindow);
      table.removeEventListener('mouseover', handleMouseOverTable);
      table?.removeEventListener('mousedown', handleMouseDown);
      table?.removeEventListener('mouseup', handleMouseUp);
    };
  });
}
