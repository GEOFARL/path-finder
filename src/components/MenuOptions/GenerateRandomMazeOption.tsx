import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWall,
  resetWalls,
  selectBoard,
} from '../../app/features/board/boardSlice';
import generateRandomMaze from '../../utils/mazeGeneration/generateRandomMaze';
import { selectAnimationSpeed } from '../../app/features/algorithms/algorithmsSlice';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Position } from '../../types';

interface GenerateRandomMazeOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
  isValid: (
    startPosition: Position,
    endPosition: Position,
    targetPosition: Position
  ) => boolean;
  setRandomMazeInterval: (intervalId: number) => void;
}

const GenerateRandomMazeOption: React.FC<GenerateRandomMazeOptionProps> = ({
  handleClose,
  cancelBuildingMaze,
  isValid,
  setRandomMazeInterval,
}) => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const animationSpeed = useSelector(selectAnimationSpeed);

  return (
    <MenuItem
      onClick={async () => {
        handleClose();
        cancelBuildingMaze();

        dispatch(resetWalls());
        const walls = generateRandomMaze(board);
        let i = 0;

        const { startPosition, endPosition } = board;
        setRandomMazeInterval(
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
      Generate random maze
    </MenuItem>
  );
};

export default GenerateRandomMazeOption;
