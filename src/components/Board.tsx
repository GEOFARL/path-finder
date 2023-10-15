import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cell from './Cell';

const SIZE = {
  rows: 8,
  cols: 10,
};

const Board: React.FC = () => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [cellSize, setCellSize] = useState(0);

  const handleResize = useCallback(() => {
    if (tableRef.current)
      setCellSize(Math.floor(tableRef.current!.offsetWidth / SIZE.cols));
    console.log(tableRef.current!.offsetWidth);
    console.log(window.innerWidth);
    console.log(
      `New size: ${Math.floor(tableRef.current!.offsetWidth / SIZE.cols)}`
    );
    // eslint-disable-next-line
  }, [window.innerWidth]);

  useEffect(() => {
    if (!tableRef.current) return;
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <table className="board" ref={tableRef}>
      <tbody>
        {Array(SIZE.rows)
          .fill(0)
          .map((_, i) => (
            <tr key={i}>
              {Array(SIZE.cols)
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
