import Board from './Board';
import ControlMenu from './ControlMenu';
import { BoardSize } from '../types';
import { calculateValue } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNumberOfCols,
  setNumberOfRows,
} from '../app/features/board/boardSlice';
import { RootState } from '../app/store';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { numOfCols, numOfRows } = useSelector(
    (state: RootState) => state.board
  );

  const handleChangeRows = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(setNumberOfRows(newValue));
    }
  };
  const handleChangeCols = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(setNumberOfCols(newValue));
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
