import { batch, useDispatch, useSelector } from 'react-redux';
import { calculateValue, shufflePositions } from '../utils';
import {
  resetSolution,
  resetWalls,
  selectBoardDimensions,
  setEndPosition,
  setStartPosition,
} from '../app/features/board/boardSlice';

export default function useShuffle() {
  const dispatch = useDispatch();
  let { numOfRows, numOfCols } = useSelector(selectBoardDimensions);

  const handleShuffle = (newValues?: { rows?: number; cols?: number }) => {
    if (newValues) {
      const { rows, cols } = newValues;
      numOfRows = rows ? rows : numOfRows;
      numOfCols = cols ? cols : numOfCols;
    }
    const [start, end] = shufflePositions(
      calculateValue(numOfRows),
      calculateValue(numOfCols)
    );
    batch(() => {
      dispatch(resetWalls());
      dispatch(resetSolution());
      dispatch(setStartPosition(start));
      dispatch(setEndPosition(end));
    });
  };

  return handleShuffle;
}
