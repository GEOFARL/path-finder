import { useEffect } from 'react';
import useIsWall from './useIsWall';
import { CellType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { addWall, removeWall } from '../app/features/board/boardSlice';

export default function useCellListeners(
  type: CellType,
  row: number,
  col: number,
  cellRef: React.MutableRefObject<HTMLDivElement | null>
) {
  const isWall = useIsWall();

  const dispatch = useDispatch();
  const { isMousePressed } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    if (type === CellType.START || type === CellType.END) return;

    const handleMouseEnter = () => {
      if (isMousePressed) {
        if (isWall(row, col)) {
          dispatch(removeWall({ row, col }));
        } else {
          dispatch(addWall({ row, col }));
        }
      }
    };

    const cell = cellRef.current;
    cell!.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cell!.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [type, row, col, isMousePressed, dispatch, isWall, cellRef]);
}
