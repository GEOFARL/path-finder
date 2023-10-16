import { useDispatch, useSelector } from 'react-redux';
import PathSearcher from '../utils/PathSearcher';
import {
  addPathPosition,
  addVisitedPosition,
  selectBoard,
} from '../app/features/board/boardSlice';
import { selectAlgorithm } from '../app/features/algorithms/algorithmsSlice';
import { useRef } from 'react';
import { Algorithm } from '../types';

export default function useSolveGrid() {
  const visitedCellsIntervalId = useRef<number | null>(null);
  const pathIntervalId = useRef<number | null>(null);

  const dispatch = useDispatch();
  const boardState = useSelector(selectBoard);
  const {
    isAnimationOn,
    speed: animationSpeed,
    type: algorithmType,
  } = useSelector(selectAlgorithm);

  const solveGrid = () => {
    const pathSearcher = new PathSearcher(boardState);

    let result;

    switch (algorithmType) {
      case Algorithm.BFS: {
        result = pathSearcher.BFS();
        break;
      }
      case Algorithm.A_STAR: {
        result = pathSearcher.aStar();
        break;
      }
    }

    const { visitedCellsArray, path, error } = result;

    if (error) {
      throw new Error(error);
    }

    path.reverse();

    let i = 0;
    if (isAnimationOn) {
      visitedCellsIntervalId.current = setInterval(() => {
        dispatch(addVisitedPosition(visitedCellsArray[i]));
        i += 1;
        if (i >= visitedCellsArray.length) {
          clearInterval(visitedCellsIntervalId.current!);

          let j = 0;
          pathIntervalId.current = setInterval(() => {
            dispatch(addPathPosition(path[j]));
            j += 1;

            if (j >= path.length) {
              clearInterval(pathIntervalId.current!);
            }
          }, animationSpeed);
        }
      }, animationSpeed);
    } else {
      for (let i = 0; i < visitedCellsArray.length; i += 1) {
        dispatch(addVisitedPosition(visitedCellsArray[i]));
      }
      for (let i = 0; i < path.length; i += 1) {
        dispatch(addPathPosition(path[i]));
      }
    }
  };

  return solveGrid;
}
