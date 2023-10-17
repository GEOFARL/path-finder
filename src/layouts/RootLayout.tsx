import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Container,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

const RootLayout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        minHeight="100vh"
        bgcolor="#f8fafc"
        p={{
          xs: '0.5rem',
          sm: '0',
        }}
        pb={{
          xs: '2rem',
          sm: '2rem',
        }}
      >
        <Container>
          <Header />
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default RootLayout;
