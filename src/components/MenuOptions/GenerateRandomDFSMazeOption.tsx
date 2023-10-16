import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWall,
  resetSolution,
  resetWalls,
  selectBoard,
} from '../../app/features/board/boardSlice';
import {
  selectAnimationSpeed,
  selectIsAnimationOn,
} from '../../app/features/algorithms/algorithmsSlice';

import SearchIcon from '@mui/icons-material/Search';
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
  const isAnimationOn = useSelector(selectIsAnimationOn);

  return (
    <MenuItem
      onClick={async () => {
        handleClose();
        cancelBuildingMaze();
        dispatch(resetWalls());
        dispatch(resetSolution());
        const walls = generateRandomDFSMaze(board);

        let i = 0;
        const { startPosition, endPosition } = board;
        if (isAnimationOn) {
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
        } else {
          for (let i = 0; i < walls.length; i += 1) {
            dispatch(addWall(walls[i]));
          }
        }
      }}
      disableRipple
    >
      <SearchIcon />
      Generate random DFS maze
    </MenuItem>
  );
};

export default GenerateRandomDFSMazeOption;
