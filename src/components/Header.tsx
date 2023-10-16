import { Box, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box
      pt={{
        xs: '2rem',
        lg: '3rem',
      }}
      display={{
        xs: 'flex',
      }}
      alignItems={{
        xs: 'center',
      }}
      justifyContent={{
        xs: 'center',
      }}
      flexDirection={{
        xs: 'column',
      }}
      gap={{
        xs: '1rem',
      }}
      mb={{
        xs: '2rem',
        sm: '0',
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
