import {
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useRef } from 'react';
import useShuffle from '../hooks/useShuffle';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWall,
  resetWalls,
  selectBoard,
} from '../app/features/board/boardSlice';
import generateRandomMaze from '../utils/mazeGeneration/generateRandomMaze';
import generateRandomDFSMaze from '../utils/mazeGeneration/DFSMaze/generateRandomDFSMaze';
import { selectAnimationSpeed } from '../app/features/algorithms/algorithmsSlice';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const MenuBar: React.FC = () => {
  const DFSMazeInterval = useRef<number | null>(null);
  const RandomMazeInterval = useRef<number | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const boardState = useSelector(selectBoard);
  const animationSpeed = useSelector(selectAnimationSpeed);

  const handleShuffle = useShuffle();

  return (
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
        <MenuItem
          onClick={() => {
            handleClose();
            if (DFSMazeInterval.current) {
              clearInterval(DFSMazeInterval.current);
            }
            if (RandomMazeInterval.current) {
              clearInterval(RandomMazeInterval.current);
            }
            handleShuffle();
          }}
          disableRipple
        >
          <ShuffleIcon />
          Shuffle Positions
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            if (DFSMazeInterval.current) {
              clearInterval(DFSMazeInterval.current);
            }
            if (RandomMazeInterval.current) {
              clearInterval(RandomMazeInterval.current);
            }

            dispatch(resetWalls());
          }}
          disableRipple
        >
          <DeleteIcon />
          Reset Walls
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={async () => {
            handleClose();
            if (DFSMazeInterval.current) {
              clearInterval(DFSMazeInterval.current);
            }
            dispatch(resetWalls());
            const walls = generateRandomMaze(boardState);
            let i = 0;

            RandomMazeInterval.current = setInterval(() => {
              dispatch(addWall(walls[i]));
              i += 1;

              if (i >= walls.length) {
                clearInterval(RandomMazeInterval.current!);
              }
            }, animationSpeed);
          }}
          disableRipple
        >
          <ShuffleIcon />
          Generate random maze
        </MenuItem>
        <MenuItem
          onClick={async () => {
            handleClose();
            if (RandomMazeInterval.current) {
              clearInterval(RandomMazeInterval.current);
            }
            dispatch(resetWalls());
            const walls = generateRandomDFSMaze(boardState);

            let i = 0;
            DFSMazeInterval.current = setInterval(() => {
              dispatch(addWall(walls[i]));
              i += 1;

              if (i >= walls.length) {
                clearInterval(DFSMazeInterval.current!);
              }
            }, animationSpeed);
          }}
          disableRipple
        >
          <ShuffleIcon />
          Generate random DFS maze
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default MenuBar;
