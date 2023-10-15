import { useState } from 'react';
import Board from './Board';
import ControlMenu from './ControlMenu';
import { BoardSize } from '../types';

const Main: React.FC = () => {
  const [numOfRows, setNumOfRows] = useState(1);
  const [numOfCols, setNumOfCols] = useState(3);

  const handleChangeRows = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setNumOfRows(newValue);
    }
  };
  const handleChangeCols = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setNumOfCols(newValue);
    }
  };

  const calculateValue = (val: number) => {
    if (val <= 6) return 4 + val;
    else if (val <= 10) return 10 + 5 * (val - 6);
    else if (val <= 12) return 30 + 10 * (val - 10);
    else return 50 + 25 * (val - 12);
  };
  return (
    <>
      <ControlMenu
        rows={numOfRows}
        cols={numOfCols}
        handleChangeRows={handleChangeRows}
        handleChangeCols={handleChangeCols}
        calculateValue={calculateValue}
      />
      <Board
        size={
          {
            rows: calculateValue(numOfRows),
            cols: calculateValue(numOfCols),
          } as BoardSize
        }
      />
    </>
  );
};

export default Main;
