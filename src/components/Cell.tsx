import { CellType } from '../types';

interface CellProps {
  type: CellType;
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

const Cell: React.FC<CellProps> = ({ type }) => {
  const cellTypeClassNames = calculateClassNames(type);

  return <div className={`board__cell ${cellTypeClassNames}`}></div>;
};

export default Cell;
