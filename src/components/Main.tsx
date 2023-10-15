import { useState } from 'react';
import Board from './Board';
import ControlMenu from './ControlMenu';
import { BoardSize } from '../types';
import { calculateValue } from '../utils';
import { DEFAULT_NUMBER_OF_COLS, DEFAULT_NUMBER_OF_ROWS } from '../constants';

const Main: React.FC = () => {
  const [numOfRows, setNumOfRows] = useState(DEFAULT_NUMBER_OF_ROWS);
  const [numOfCols, setNumOfCols] = useState(DEFAULT_NUMBER_OF_COLS);

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
