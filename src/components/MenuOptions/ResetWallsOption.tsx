import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetWalls } from '../../app/features/board/boardSlice';

import FenceIcon from '@mui/icons-material/Fence';

interface ResetWallsOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ResetWallsOption: React.FC<ResetWallsOptionProps> = ({
  handleClose,
  cancelBuildingMaze,
}) => {
  const dispatch = useDispatch();

  return (
    <MenuItem
      onClick={() => {
        handleClose();
        cancelBuildingMaze();

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
