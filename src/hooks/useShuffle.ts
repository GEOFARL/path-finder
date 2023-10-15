import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { calculateValue, shufflePositions } from '../utils';
import {
  setEndPosition,
  setStartPosition,
} from '../app/features/board/boardSlice';

export default function useShuffle() {
  const dispatch = useDispatch();
  const { numOfRows, numOfCols } = useSelector(
    (state: RootState) => state.board
  );

  const handleShuffle = () => {
    const [start, end] = shufflePositions(
      calculateValue(numOfRows),
      calculateValue(numOfCols)
    );
    dispatch(setStartPosition(start));
    dispatch(setEndPosition(end));
  };

  return handleShuffle;
}
