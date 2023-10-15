import { batch, useDispatch, useSelector } from 'react-redux';
import { calculateValue, shufflePositions } from '../utils';
import {
  resetWalls,
  selectBoardDimensions,
  setEndPosition,
  setStartPosition,
} from '../app/features/board/boardSlice';

export default function useShuffle() {
  const dispatch = useDispatch();
  const { numOfRows, numOfCols } = useSelector(selectBoardDimensions);

  const handleShuffle = () => {
    const [start, end] = shufflePositions(
      calculateValue(numOfRows),
      calculateValue(numOfCols)
    );
    batch(() => {
      dispatch(setStartPosition(start));
      dispatch(setEndPosition(end));
      dispatch(resetWalls());
    });
  };

  return handleShuffle;
}
