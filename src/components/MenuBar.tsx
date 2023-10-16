import { Box, Button, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import ShuffleOption from './MenuOptions/ShuffleOption';
import ResetWallsOption from './MenuOptions/ResetWallsOption';
import GenerateRandomMazeOption from './MenuOptions/GenerateRandomMazeOption';
import GenerateRandomDFSMazeOption from './MenuOptions/GenerateRandomDFSMazeOption';
import StyledMenu from './StyledMenu';
import { canWallBePlaced } from '../utils/validation';
import useMazeIntervals from '../hooks/useMazeIntervals';
import AnimationSwitch from './AnimationSwitch';
import ResetSolutionOption from './MenuOptions/ResetSolutionOption';
import ResetOption from './MenuOptions/ResetOption';

const MenuBar: React.FC = () => {
  const { cancelBuildingMaze, setDFSInterval, setRandomMazeInterval } =
    useMazeIntervals();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      flexDirection={{
        xs: 'row',
      }}
      alignItems={{
        xs: 'center',
      }}
      justifyContent={{
        xs: 'flex-end',
      }}
    >
      <div>
        <Button
          id="settings-menu"
          aria-controls={open ? 'settings-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          fullWidth
        >
          Options
        </Button>
        <StyledMenu
          id="settings-menu"
          MenuListProps={{
            'aria-labelledby': 'settings-menu',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <ShuffleOption
            cancelBuildingMaze={cancelBuildingMaze}
            handleClose={handleClose}
          />
          <ResetWallsOption
            cancelBuildingMaze={cancelBuildingMaze}
            handleClose={handleClose}
          />
          <ResetSolutionOption
            cancelBuildingMaze={cancelBuildingMaze}
            handleClose={handleClose}
          />
          <ResetOption
            cancelBuildingMaze={cancelBuildingMaze}
            handleClose={handleClose}
          />
          <Divider sx={{ my: 0.5 }} />
          <GenerateRandomMazeOption
            cancelBuildingMaze={cancelBuildingMaze}
            handleClose={handleClose}
            isValid={canWallBePlaced}
            setRandomMazeInterval={setRandomMazeInterval}
          />
          <GenerateRandomDFSMazeOption
            cancelBuildingMaze={cancelBuildingMaze}
            handleClose={handleClose}
            isValid={canWallBePlaced}
            setDFSInterval={setDFSInterval}
          />
        </StyledMenu>
      </div>

      <AnimationSwitch />
    </Box>
  );
};

export default MenuBar;
