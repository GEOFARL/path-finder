import { Box, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box
      pt={{
        xs: '2rem',
        lg: '3rem',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 600,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        Path Finder
      </Typography>
    </Box>
  );
};

export default Header;
