import { Box, Button, Grid, Stack } from '@mui/material';
import AlgorithmSelect from './AlgorithmSelect';
import SpeedSelect from './SpeedSelect';
import SliderHandle from './SliderHandle';

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
  return (
    <Box
      mt={{
        xs: '1rem',
        md: '1.5rem',
        lg: '2rem',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <AlgorithmSelect />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SpeedSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained">
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
      </Stack>
    </Box>
  );
};

export default ControlMenu;
