import { MenuItem } from '@mui/material';
import useShuffle from '../../hooks/useShuffle';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import useStopSolving from '../../hooks/useStopSolving';

interface ShuffleOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ShuffleOption: React.FC<ShuffleOptionProps> = ({
  handleClose,
  cancelBuildingMaze,
}) => {
  const handleShuffle = useShuffle();
  const stopSolving = useStopSolving();

  return (
    <MenuItem
      onClick={() => {
        handleClose();
        cancelBuildingMaze();
        stopSolving();
        handleShuffle();
      }}
      disableRipple
    >
      <ShuffleIcon />
      Shuffle Positions
    </MenuItem>
  );
};

export default ShuffleOption;
