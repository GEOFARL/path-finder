import React, { DragEvent, useRef } from 'react';
import Cell from './Cell';
import { BoardSize, CellType } from '../types';
import useResize from '../hooks/useResize';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBoard,
  setCellSize,
  setEndPosition,
  setStartPosition,
} from '../app/features/board/boardSlice';
import useTableListeners from '../hooks/useTableListeners';
import useIsWall from '../hooks/useIsWall';

interface BoardProps {
  size: BoardSize;
}

const Board: React.FC<BoardProps> = ({ size }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const dispatch = useDispatch();
  const { cellSize, startPosition, endPosition } = useSelector(selectBoard);

  const isWall = useIsWall();

  useResize({
    ref: tableRef,
    changeCellSize: (val: number) => dispatch(setCellSize(val)),
    size,
  });

  useTableListeners(tableRef);

  const getCell = (row: number, col: number) => {
    if (row === startPosition.row && col === startPosition.col) {
      return <Cell type={CellType.START} position={{ row, col }} />;
    } else if (row === endPosition.row && col === endPosition.col) {
      return <Cell type={CellType.END} position={{ row, col }} />;
    } else if (isWall(row, col)) {
      return <Cell type={CellType.WALL} position={{ row, col }} />;
    }
    return <Cell type={CellType.EMPTY} position={{ row, col }} />;
  };

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

      console.log((targetX - x1) / cellSize);
      console.log(col, row, startPosition, endPosition);

      if (
        (row === startPosition.row && col === startPosition.col) ||
        (row === endPosition.row && col === endPosition.col) ||
        isWall(row, col)
      ) {
        return;
      }

      const isStart = e.target.classList.contains('board__cell--start');

      if (isStart) {
        dispatch(setStartPosition({ row, col }));
      } else {
        dispatch(setEndPosition({ row, col }));
      }
    }
  };

  return (
    <table className="board" ref={tableRef}>
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
                    {getCell(row, col)}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default Board;
