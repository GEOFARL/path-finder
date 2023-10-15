import { Box, Grid } from '@mui/material';
import AlgorithmSelect from './AlgorithmSelect';

const ControlMenu: React.FC = () => {
  return (
    <Box sx={{ marginTop: '3rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AlgorithmSelect />
        </Grid>
        <Grid item xs={3}>
          <AlgorithmSelect />
        </Grid>
        <Grid item xs={3}>
          <AlgorithmSelect />
        </Grid>
        <Grid item xs={3}>
          <AlgorithmSelect />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlMenu;
