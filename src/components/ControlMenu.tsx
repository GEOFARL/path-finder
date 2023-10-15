import { Box, Button, Grid } from '@mui/material';
import AlgorithmSelect from './AlgorithmSelect';
import SpeedSelect from './SpeedSelect';

const ControlMenu: React.FC = () => {
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
    </Box>
  );
};

export default ControlMenu;
