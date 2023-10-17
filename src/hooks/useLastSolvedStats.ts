import { useSelector } from 'react-redux';
import { selectLastSolvedStats } from '../app/features/algorithms/algorithmsSlice';

export default function useLastSolvedStats() {
  return useSelector(selectLastSolvedStats);
}
