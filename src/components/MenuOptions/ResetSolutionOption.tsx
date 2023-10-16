import { MenuItem } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { resetSolution } from '../../app/features/board/boardSlice';
import useStopSolving from '../../hooks/useStopSolving';

interface ResetSolutionOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ResetSolutionOption: React.FC<ResetSolutionOptionProps> = ({
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
