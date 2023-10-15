import { Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
