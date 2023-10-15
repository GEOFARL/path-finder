import { Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Typography
      variant="h1"
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
