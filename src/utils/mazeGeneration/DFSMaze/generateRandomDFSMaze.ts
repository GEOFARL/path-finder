import { calculateValue } from '../..';
import { RootState } from '../../../app/store';
import RandomizedDFSMazeCreator from './randomizedDFSMazeCreator';

export default function generateRandomDFSMaze(boardState: RootState['board']) {
  const dfsGenerator = new RandomizedDFSMazeCreator(
    calculateValue(boardState.numOfRows),
    calculateValue(boardState.numOfCols)
  );
  const walls = dfsGenerator.getWallsArray();
  return walls;
}
