import { LOCAL_STORAGE_KEYS } from '../../constants';
import { Algorithm, SavedState } from '../../types';

export const handleDelete = (id: string) => {
  for (const key of LOCAL_STORAGE_KEYS) {
    const savedStates = localStorage.getItem(key);

    if (savedStates) {
      const parsedStates = JSON.parse(savedStates);
      const updatedState = parsedStates.filter(
        (state: SavedState) => state.id !== id
      );
      localStorage.setItem(key, JSON.stringify(updatedState));
    }
  }
};

export const handleDeleteAll = (type: Algorithm) => {
  switch (type) {
    case 'A_STAR' as Algorithm: {
      localStorage.removeItem('savedStatesAStar');
      break;
    }
    case Algorithm.BFS: {
      localStorage.removeItem('savedStatesBFS');
      break;
    }
  }
};
