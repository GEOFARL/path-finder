import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { AlgorithmCharacteristics } from '../types/pathSearcher';
import { selectBoard } from '../app/features/board/boardSlice';
import { Algorithm, SavedState } from '../types';
import { selectAlgorithm } from '../app/features/algorithms/algorithmsSlice';

export default function useSaveState() {
  const { numOfRows, numOfCols, startPosition, endPosition, walls } =
    useSelector(selectBoard);
  const { type } = useSelector(selectAlgorithm);

  const saveState = (stats: AlgorithmCharacteristics) => {
    let savedStates: string | null;

    switch (type) {
      case Algorithm.BFS: {
        savedStates = localStorage.getItem('savedStatesBFS');
        break;
      }
      case 'A_STAR' as Algorithm: {
        savedStates = localStorage.getItem('savedStatesAStar');
        break;
      }
    }

    let parsedSavedStates: SavedState[] = [];
    if (savedStates!) {
      parsedSavedStates = JSON.parse(savedStates);
    }

    const newState: SavedState = {
      id: uuidv4(),
      rows: numOfRows,
      cols: numOfCols,
      start: startPosition,
      end: endPosition,
      walls,
      stats,
    };
    parsedSavedStates.push(newState);

    if (parsedSavedStates.length > 20) {
      parsedSavedStates.shift();
    }

    switch (type) {
      case Algorithm.BFS: {
        localStorage.setItem(
          'savedStatesBFS',
          JSON.stringify(parsedSavedStates)
        );
        break;
      }

      case 'A_STAR' as Algorithm: {
        localStorage.setItem(
          'savedStatesAStar',
          JSON.stringify(parsedSavedStates)
        );
        break;
      }
    }
  };

  return saveState;
}
