import { Box, Button, Grid, Stack } from '@mui/material';
import AlgorithmSelect from './AlgorithmSelect';
import SpeedSelect from './SpeedSelect';
import SliderHandle from './SliderHandle';
import MenuBar from './MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPathPosition,
  addVisitedPosition,
  selectBoard,
} from '../app/features/board/boardSlice';
import PathSearcher from '../utils/PathSearcher';
import { useRef } from 'react';
import {
  selectAnimationSpeed,
  selectIsAnimationOn,
} from '../app/features/algorithms/algorithmsSlice';

interface ControlMenuProps {
  rows: number;
  cols: number;
  handleChangeRows: (e: Event, newValue: number | number[]) => void;
  handleChangeCols: (e: Event, newValue: number | number[]) => void;
  calculateValue: (value: number) => number;
}

const ControlMenu: React.FC<ControlMenuProps> = ({
  rows,
  cols,
  handleChangeCols,
  handleChangeRows,
  calculateValue,
}) => {
  const boardState = useSelector(selectBoard);
  const animationSpeed = useSelector(selectAnimationSpeed);
  const isAnimationOn = useSelector(selectIsAnimationOn);
  const visitedCellsIntervalId = useRef<number | null>(null);
  const pathIntervalId = useRef<number | null>(null);
  const dispatch = useDispatch();

  const solveGrid = () => {
    const pathSearcher = new PathSearcher(boardState);

    const result = pathSearcher.BFS();
    const { visitedCellsArray, path } = result;
    path.reverse();

    let i = 0;
    if (isAnimationOn) {
      visitedCellsIntervalId.current = setInterval(() => {
        dispatch(addVisitedPosition(visitedCellsArray[i]));
        i += 1;
        if (i >= visitedCellsArray.length) {
          clearInterval(visitedCellsIntervalId.current!);

          let j = 0;
          pathIntervalId.current = setInterval(() => {
            dispatch(addPathPosition(path[j]));
            j += 1;

            if (j >= path.length) {
              clearInterval(pathIntervalId.current!);
            }
          }, animationSpeed);
        }
      }, animationSpeed);
    } else {
      for (let i = 0; i < visitedCellsArray.length; i += 1) {
        dispatch(addVisitedPosition(visitedCellsArray[i]));
      }
      for (let i = 0; i < path.length; i += 1) {
        dispatch(addPathPosition(path[i]));
      }
    }
  };

  return (
    <Box
      mt={{
        xs: '1rem',
        md: '1.5rem',
        lg: '2rem',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <AlgorithmSelect />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SpeedSelect />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={solveGrid}>
            Solve
          </Button>
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 10 }}
        sx={{
          justifyContent: 'center',
          mt: '1rem',
          px: {
            xs: '1rem',
            sm: '0',
          },
        }}
      >
        <Box
          display="flex"
          gap={{
            sx: '1rem',
            md: '2rem',
          }}
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          <SliderHandle
            value={rows}
            handleChange={handleChangeRows}
            title={`Rows: ${calculateValue(rows)}`}
            calculateValue={calculateValue}
          />
          <SliderHandle
            value={cols}
            handleChange={handleChangeCols}
            title={`Cols: ${calculateValue(cols)}`}
            calculateValue={calculateValue}
          />
        </Box>

        <MenuBar />
      </Stack>
    </Box>
  );
};

export default ControlMenu;
