import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import Header from './components/Header';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { store } from './app/store';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

document.addEventListener('dragover', (e) => e.preventDefault());

function App() {
  return (
    <Provider store={store}>
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
            <Main />
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
