import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWall,
  resetSolution,
  resetWalls,
  selectBoard,
} from '../../app/features/board/boardSlice';
import generateRandomMaze from '../../utils/mazeGeneration/generateRandomMaze';
import {
  selectAnimationSpeed,
  selectIsAnimationOn,
} from '../../app/features/algorithms/algorithmsSlice';

import ExtensionIcon from '@mui/icons-material/Extension';
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
  const isAnimationOn = useSelector(selectIsAnimationOn);

  return (
    <MenuItem
      onClick={async () => {
        handleClose();
        cancelBuildingMaze();

        dispatch(resetWalls());
        dispatch(resetSolution());

        const walls = generateRandomMaze(board);
        let i = 0;

        const { startPosition, endPosition } = board;
        if (isAnimationOn) {
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
        } else {
          for (let i = 0; i < walls.length; i += 1) {
            dispatch(addWall(walls[i]));
          }
        }
      }}
      disableRipple
    >
      <ExtensionIcon />
      Generate random maze
    </MenuItem>
  );
};

export default GenerateRandomMazeOption;
