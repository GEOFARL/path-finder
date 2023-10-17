import { Box, Stack, Typography } from '@mui/material';
import Stats from '../components/Stats';

const StatsPage: React.FC = () => {
  return (
    <Box mt={{ xs: '5rem', sm: '6rem' }}>
      <Stack direction={'column'}>
        <Typography variant="h4" textTransform={'uppercase'} fontWeight={700}>
          Algorithm evaluation characteristics
        </Typography>

        <Stats mt={'1rem'} />
      </Stack>
    </Box>
  );
};

export default StatsPage;
