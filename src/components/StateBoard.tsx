import { useRef, useState } from 'react';
import { CellType, Position } from '../types';
import useResize from '../hooks/useResize';
import Cell from './Cell';

interface StateBoardProps {
  rows: number;
  cols: number;
  walls: Position[];
  start: Position;
  end: Position;
}

const StateBoard: React.FC<StateBoardProps> = ({
  rows,
  cols,
  walls,
  start,
  end,
}) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [cellSize, setCellSize] = useState(0);

  useResize({
    ref: tableRef,
    changeCellSize: (val: number) => setCellSize(val),
    size: { rows, cols },
  });

  const getCellType = (row: number, col: number) => {
    if (row === start.row && col === start.col) {
      return CellType.START;
    } else if (row === end.row && col === end.col) {
      return CellType.END;
    } else if (
      walls.some((wallPos) => wallPos.row === row && wallPos.col === col)
    ) {
      return CellType.WALL;
    }
    return CellType.EMPTY;
  };

  return (
    <table className="board board-container" ref={tableRef}>
      <tbody>
        {Array(rows)
          .fill(0)
          .map((_, row) => (
            <tr key={row}>
              {Array(cols)
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
  );
};

export default StateBoard;
