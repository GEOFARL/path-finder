import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWall,
  resetWalls,
  selectBoard,
} from '../../app/features/board/boardSlice';
import { selectAnimationSpeed } from '../../app/features/algorithms/algorithmsSlice';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Position } from '../../types';
import generateRandomDFSMaze from '../../utils/mazeGeneration/DFSMaze/generateRandomDFSMaze';

interface GenerateRandomDFSMazeOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
  isValid: (
    startPosition: Position,
    endPosition: Position,
    targetPosition: Position
  ) => boolean;
  setDFSInterval: (intervalId: number) => void;
}

const GenerateRandomDFSMazeOption: React.FC<
  GenerateRandomDFSMazeOptionProps
> = ({ handleClose, cancelBuildingMaze, isValid, setDFSInterval }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const animationSpeed = useSelector(selectAnimationSpeed);

  return (
    <MenuItem
      onClick={async () => {
        handleClose();
        cancelBuildingMaze();
        dispatch(resetWalls());
        const walls = generateRandomDFSMaze(board);

        let i = 0;
        const { startPosition, endPosition } = board;
        setDFSInterval(
          setInterval(() => {
            if (isValid(startPosition, endPosition, walls[i])) {
              dispatch(addWall(walls[i]));
              i += 1;
            }

            if (i >= walls.length) {
              cancelBuildingMaze();
            }
          }, animationSpeed)
        );
      }}
      disableRipple
    >
      <ShuffleIcon />
      Generate random DFS maze
    </MenuItem>
  );
};

export default GenerateRandomDFSMazeOption;
