import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import Header from './components/Header';
import ControlMenu from './components/ControlMenu';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" bgcolor="#f8fafc">
        <Container>
          <Header />
          <ControlMenu />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
