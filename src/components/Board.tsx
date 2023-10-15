import React, { useRef, useState } from 'react';
import Cell from './Cell';
import { BoardSize, CellType, Position } from '../types';
import useResize from '../hooks/useResize';
import { DEFAULT_END_POSITION, DEFAULT_START_POSITION } from '../constants';

interface BoardProps {
  size: BoardSize;
}

const Board: React.FC<BoardProps> = ({ size }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [cellSize, setCellSize] = useState(0);

  const [startPosition, setStartPosition] = useState<Position>(
    DEFAULT_START_POSITION
  );
  const [endPosition, setEndPosition] =
    useState<Position>(DEFAULT_END_POSITION);

  useResize({ ref: tableRef, setCellSize, size });

  const getCell = (row: number, col: number) => {
    if (row === startPosition.row && col === endPosition.col) {
      return <Cell type={CellType.START} />;
    } else if (row === endPosition.row && col === endPosition.row) {
      return <Cell type={CellType.END} />;
    }
    return <Cell type={CellType.EMPTY} />;
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
