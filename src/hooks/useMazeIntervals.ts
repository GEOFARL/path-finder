import { useRef } from 'react';

export default function useMazeIntervals() {
  const DFSMazeInterval = useRef<number | null>(null);
  const randomMazeInterval = useRef<number | null>(null);

  const cancelBuildingMaze = () => {
    if (DFSMazeInterval.current) {
      clearInterval(DFSMazeInterval.current);
    }
    if (randomMazeInterval.current) {
      clearInterval(randomMazeInterval.current);
    }
  };

  const setDFSInterval = (intervalId: number) =>
    (DFSMazeInterval.current = intervalId);
  const setRandomMazeInterval = (intervalId: number) =>
    (randomMazeInterval.current = intervalId);

  return {
    cancelBuildingMaze,
    setDFSInterval,
    setRandomMazeInterval,
  };
}
