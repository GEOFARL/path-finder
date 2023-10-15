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

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box minHeight="100vh" bgcolor="#f8fafc">
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
