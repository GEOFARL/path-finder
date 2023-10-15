import {
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
      <Container>
        <Header />
        <ControlMenu />
      </Container>
    </ThemeProvider>
  );
}

export default App;
