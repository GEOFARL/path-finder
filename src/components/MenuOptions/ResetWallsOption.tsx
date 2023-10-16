import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetWalls } from '../../app/features/board/boardSlice';

import FenceIcon from '@mui/icons-material/Fence';
import useStopSolving from '../../hooks/useStopSolving';

interface ResetWallsOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ResetWallsOption: React.FC<ResetWallsOptionProps> = ({
  handleClose,
  cancelBuildingMaze,
}) => {
  const dispatch = useDispatch();
  const stopSolving = useStopSolving();

  return (
    <MenuItem
      onClick={() => {
        handleClose();
        cancelBuildingMaze();
        stopSolving();

        dispatch(resetWalls());
      }}
      disableRipple
    >
      <FenceIcon />
      Reset Walls
    </MenuItem>
  );
};

export default ResetWallsOption;
