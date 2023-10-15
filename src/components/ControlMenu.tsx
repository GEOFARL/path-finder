import { Box, Button, Grid } from '@mui/material';
import AlgorithmSelect from './AlgorithmSelect';
import SpeedSelect from './SpeedSelect';

const ControlMenu: React.FC = () => {
  return (
    <Box sx={{ marginTop: '3rem' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <AlgorithmSelect />
        </Grid>
        <Grid item xs={3}>
          <SpeedSelect />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained">
            Solve
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlMenu;
