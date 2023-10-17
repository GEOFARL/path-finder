import { Box, Chip } from '@mui/material';
import { AlgorithmCharacteristics } from '../types/pathSearcher';

interface SolutionStatsProps extends AlgorithmCharacteristics {
  //eslint-disable-next-line
  [key: string]: any;
}

const SolutionStats: React.FC<SolutionStatsProps> = ({
  iterationCount,
  maxStatesInMemory,
  totalGeneratedStates,
  ...props
}) => {
  return (
    <Box
      display={{ xs: 'flex' }}
      gap={{ xs: '1rem' }}
      flexDirection={{ xs: 'column', sm: 'row' }}
      {...props}
    >
      <Chip label={`Iteration Count: ${iterationCount}`} color="primary" />
      <Chip
        label={`Maximum states in memory: ${maxStatesInMemory}`}
        color="primary"
        variant="outlined"
      />
      <Chip
        label={`Total generated states: ${totalGeneratedStates}`}
        color="primary"
      />
    </Box>
  );
};

export default SolutionStats;
