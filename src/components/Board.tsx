import React, { useRef } from 'react';
import Cell from './Cell';
import { BoardSize, CellType } from '../types';
import useResize from '../hooks/useResize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setCellSize } from '../app/features/board/boardSlice';

interface BoardProps {
  size: BoardSize;
}

const Board: React.FC<BoardProps> = ({ size }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const dispatch = useDispatch();
  const { cellSize, startPosition, endPosition } = useSelector(
    (state: RootState) => state.board
  );

  useResize({
    ref: tableRef,
    changeCellSize: (val: number) => dispatch(setCellSize(val)),
    size,
  });

  const getCell = (row: number, col: number) => {
    if (row === startPosition.row && col === startPosition.col) {
      return <Cell type={CellType.START} />;
    } else if (row === endPosition.row && col === endPosition.col) {
      console.log(row, col);
      console.log(endPosition);
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
