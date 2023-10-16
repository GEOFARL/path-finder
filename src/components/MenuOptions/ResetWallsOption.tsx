import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetWalls } from '../../app/features/board/boardSlice';

import DeleteIcon from '@mui/icons-material/Delete';

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
      <DeleteIcon />
      Reset Walls
    </MenuItem>
  );
};

export default ResetWallsOption;
