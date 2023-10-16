import { MenuItem } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { resetSolution } from '../../app/features/board/boardSlice';

interface ResetSolutionOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ResetSolutionOption: React.FC<ResetSolutionOptionProps> = ({
  handleClose,
  cancelBuildingMaze,
}) => {
  const dispatch = useDispatch();

  return (
    <MenuItem
      onClick={() => {
        handleClose();
        cancelBuildingMaze();

        dispatch(resetSolution());
      }}
      disableRipple
    >
      <DeleteIcon />
      Reset Solution
    </MenuItem>
  );
};

export default ResetSolutionOption;
