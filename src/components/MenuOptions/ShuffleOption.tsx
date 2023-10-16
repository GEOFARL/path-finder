import { MenuItem } from '@mui/material';
import useShuffle from '../../hooks/useShuffle';

import ShuffleIcon from '@mui/icons-material/Shuffle';

interface ShuffleOptionProps {
  handleClose: () => void;
  cancelBuildingMaze: () => void;
}

const ShuffleOption: React.FC<ShuffleOptionProps> = ({
  handleClose,
  cancelBuildingMaze,
}) => {
  const handleShuffle = useShuffle();

  return (
    <MenuItem
      onClick={() => {
        handleClose();
        cancelBuildingMaze();
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
