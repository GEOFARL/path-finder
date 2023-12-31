import { useDispatch, useSelector } from 'react-redux';
import {
  resetSolution,
  selectBoard,
  setNumberOfCols,
  setNumberOfRows,
} from '../app/features/board/boardSlice';
import useShuffle from '../hooks/useShuffle';
import useStopSolving from '../hooks/useStopSolving';
import ControlMenu from '../components/ControlMenu';
import { calculateValue } from '../utils';
import Board from '../components/Board';
import { BoardSize } from '../types';

const VisualizerPage: React.FC = () => {
  const dispatch = useDispatch();
  const { numOfCols, numOfRows } = useSelector(selectBoard);
  const handleShuffle = useShuffle();
  const stopSolving = useStopSolving();

  const handleChangeRows = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(resetSolution());
      stopSolving();
      dispatch(setNumberOfRows(newValue));
      handleShuffle({ rows: newValue });
    }
  };
  const handleChangeCols = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(resetSolution());
      stopSolving();
      dispatch(setNumberOfCols(newValue));
      handleShuffle({ cols: newValue });
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

export default VisualizerPage;
