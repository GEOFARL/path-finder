import React, { DragEvent, useRef } from 'react';
import Cell from './Cell';
import { BoardSize } from '../types';
import useResize from '../hooks/useResize';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetSolution,
  selectBoard,
  setCellSize,
  setEndPosition,
  setStartPosition,
} from '../app/features/board/boardSlice';
import useTableListeners from '../hooks/useTableListeners';
import useGetCellType from '../hooks/useGetCellType';
import useIsWall from '../hooks/useIsWall';
import SolutionStats from './SolutionStats';
import { Box } from '@mui/material';
import useLastSolvedStats from '../hooks/useLastSolvedStats';

interface BoardProps {
  size: BoardSize;
}

const Board: React.FC<BoardProps> = ({ size }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const dispatch = useDispatch();
  const { cellSize, startPosition, endPosition } = useSelector(selectBoard);

  useResize({
    ref: tableRef,
    changeCellSize: (val: number) => dispatch(setCellSize(val)),
    size,
  });

  useTableListeners(tableRef);

  const isWall = useIsWall();
  const getCellType = useGetCellType();

  const lastSolvedStats = useLastSolvedStats();

  const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    const size = tableRef.current?.getBoundingClientRect();
    const { x: x1, y: y1 } = size!;
    const x2 = x1 + size!.width;
    const y2 = y1 + size!.height;

    const { clientX: targetX, clientY: targetY } = e;
    if (targetX >= x1 && targetX <= x2 && targetY >= y1 && targetY <= y2) {
      const col = Math.floor((targetX - x1) / cellSize);
      const row = Math.floor((targetY - y1) / cellSize);

      if (
        (row === startPosition.row && col === startPosition.col) ||
        (row === endPosition.row && col === endPosition.col) ||
        isWall(row, col)
      ) {
        return;
      }

      const isStart = e.target.classList.contains('board__cell--start');

      dispatch(resetSolution());
      if (isStart) {
        dispatch(setStartPosition({ row, col }));
      } else {
        dispatch(setEndPosition({ row, col }));
      }
    }
  };

  return (
    <Box mt={{ xs: '2rem', md: '4rem' }} className="board-container">
      {lastSolvedStats && <SolutionStats mb={'1rem'} {...lastSolvedStats} />}
      <table className="board board-container" ref={tableRef}>
        <tbody>
          {Array(size.rows)
            .fill(0)
            .map((_, row) => (
              <tr key={row}>
                {Array(size.cols)
                  .fill(0)
                  .map((_, col) => (
                    <td
                      className="board__cell-container"
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                      key={col}
                      onDragEnd={handleDragEnd}
                    >
                      <Cell
                        type={getCellType(row, col)}
                        position={{ row, col }}
                      />
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
};
export default Board;
