import { Box, Button, Grid, Stack } from '@mui/material';
import AlgorithmSelect from './AlgorithmSelect';
import SpeedSelect from './SpeedSelect';
import SliderHandle from './SliderHandle';
import MenuBar from './MenuBar';
import useSolveGrid from '../hooks/useSolveGrid';

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
  const solveGrid = useSolveGrid();
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
