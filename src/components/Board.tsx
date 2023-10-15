import React, { useRef, useState } from 'react';
import Cell from './Cell';
import { BoardSize } from '../types';
import useResize from '../hooks/useResize';

interface BoardProps {
  size: BoardSize;
}

const Board: React.FC<BoardProps> = ({ size }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [cellSize, setCellSize] = useState(0);

  useResize({ ref: tableRef, setCellSize, size });

  return (
    <table className="board" ref={tableRef}>
      <tbody>
        {Array(size.rows)
          .fill(0)
          .map((_, i) => (
            <tr key={i}>
              {Array(size.cols)
                .fill(0)
                .map((_, i) => (
                  <td
                    className="board__cell-container"
                    style={{
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
                    }}
                    key={i}
                  >
                    <Cell />
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default Board;
