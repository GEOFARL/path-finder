import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWall,
  removeWall,
  selectBoard,
  setIsMousePressed,
} from '../app/features/board/boardSlice';
import useIsWall from './useIsWall';

export default function useTableListeners(
  tableRef: React.MutableRefObject<HTMLTableElement | null>
) {
  const dispatch = useDispatch();
  const { startPosition, endPosition, walls, isMousePressed } =
    useSelector(selectBoard);

  const isWall = useIsWall();

  const isValid = useCallback(
    (row: number, col: number) =>
      (row !== startPosition.row || col !== startPosition.col) &&
      (row !== endPosition.row || col !== endPosition.col),
    [startPosition.row, startPosition.col, endPosition.row, endPosition.col]
  );

  const handleMouseDown = useCallback(
    (e: Event) => {
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }

      const row = +e.target.dataset['row']!;
      const col = +e.target.dataset['col']!;
      if (!isValid(row, col)) {
        return;
      }

      dispatch(setIsMousePressed(true));

      if (walls.some((wallPos) => wallPos.row === row && wallPos.col === col)) {
        dispatch(removeWall({ row, col }));
      } else {
        dispatch(addWall({ row, col }));
      }
    },
    [walls, dispatch, isValid]
  );

  const handleMouseOverTable = useCallback(
    (e: Event) => {
      e.stopPropagation();
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }

      const row = +e.target.dataset['row']!;
      const col = +e.target.dataset['col']!;

      if (isMousePressed) {
        if (isWall(row, col)) {
          dispatch(removeWall({ row, col }));
        } else {
          dispatch(addWall({ row, col }));
        }
      }
    },
    [dispatch, isMousePressed, isWall]
  );

  useEffect(() => {
    if (!tableRef.current) return;

    const handleMouseUp = () => {
      dispatch(setIsMousePressed(false));
    };

    const handleMouseOverWindow = () => {
      dispatch(setIsMousePressed(false));
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
  }, [dispatch, tableRef, isWall, handleMouseDown, handleMouseOverTable]);
}
