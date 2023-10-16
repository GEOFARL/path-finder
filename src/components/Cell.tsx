import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (type !== CellType.START && type !== CellType.END) {
      return;
    }

    const handleDragStart = (e: Event) => {
      console.log(e);
    };
    const handleDragEnd = (e: Event) => {
      console.log(e);
    };

    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('drop', handleDragEnd);

    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('drop', handleDragEnd);
    };
  }, [type]);

  return (
    <div
      className={`board__cell ${cellTypeClassNames}`}
      ref={cellRef}
      data-row={row}
      data-col={col}
      draggable={type === CellType.START || type === CellType.END}
    ></div>
  );
};

export default Cell;
