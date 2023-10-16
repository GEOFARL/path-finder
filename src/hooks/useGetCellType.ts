import { useSelector } from 'react-redux';
import { selectStartEnd } from '../app/features/board/boardSlice';
import { CellType } from '../types';
import useIsWall from './useIsWall';
import useIsVisited from './useIsVisited';
import useIsPath from './useIsPath';

export default function useGetCellType() {
  const { startPosition, endPosition } = useSelector(selectStartEnd);

  const isWall = useIsWall();
  const isVisited = useIsVisited();
  const isPath = useIsPath();

  const getCellType = (row: number, col: number) => {
    if (row === startPosition.row && col === startPosition.col) {
      return CellType.START;
    } else if (row === endPosition.row && col === endPosition.col) {
      return CellType.END;
    } else if (isWall(row, col)) {
      return CellType.WALL;
    } else if (isVisited(row, col) && !isPath(row, col)) {
      return CellType.VISITED;
    } else if (isPath(row, col)) {
      return CellType.PATH;
    }
    return CellType.EMPTY;
  };

  return getCellType;
}
