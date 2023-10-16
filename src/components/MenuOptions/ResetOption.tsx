import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetSolution, resetWalls } from '../../app/features/board/boardSlice';

import CloseIcon from '@mui/icons-material/Close';

interface ResetOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ResetOption: React.FC<ResetOptionProps> = ({
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
        dispatch(resetSolution());
      }}
      disableRipple
    >
      <CloseIcon />
      Reset
    </MenuItem>
  );
};

export default ResetOption;
