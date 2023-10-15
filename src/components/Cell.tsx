import { useRef } from 'react';
import { CellType, Position } from '../types';

interface CellProps {
  type: CellType;
  position: Position;
}

function calculateClassNames(type: CellType): string {
  let classNames = '';

  switch (type) {
    case CellType.WALL: {
      classNames += 'board__cell--wall';
      break;
    }
    case CellType.START: {
      classNames += 'board__cell--start';
      break;
    }
    case CellType.END: {
      classNames += 'board__cell--end';
      break;
    }
  }

  return classNames;
}

const Cell: React.FC<CellProps> = ({ type, position }) => {
  const cellRef = useRef<HTMLDivElement | null>(null);
  const cellTypeClassNames = calculateClassNames(type);

  const { row, col } = position;

  return (
    <div
      className={`board__cell ${cellTypeClassNames}`}
      ref={cellRef}
      data-row={row}
      data-col={col}
    ></div>
  );
};

export default Cell;
