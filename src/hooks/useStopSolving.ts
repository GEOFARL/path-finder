import { useSelector } from 'react-redux';
import { selectSolvingIntervals } from '../app/features/algorithms/algorithmsSlice';

export default function useStopSolving() {
  const intervalIds = useSelector(selectSolvingIntervals);

  const stopSolving = () => {
    intervalIds.forEach((id) => clearInterval(id));
  };

  return stopSolving;
}
