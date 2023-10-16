import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetSolution, resetWalls } from '../../app/features/board/boardSlice';

import CloseIcon from '@mui/icons-material/Close';
import useStopSolving from '../../hooks/useStopSolving';

interface ResetOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ResetOption: React.FC<ResetOptionProps> = ({
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
