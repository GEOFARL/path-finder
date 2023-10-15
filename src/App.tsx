import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import Header from './components/Header';
import ControlMenu from './components/ControlMenu';
import Board from './components/Board';
import { useState } from 'react';
import { BoardSize } from './types';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

function App() {
  const [numOfRows, setNumOfRows] = useState(1);
  const [numOfCols, setNumOfCols] = useState(3);

  const handleChangeRows = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setNumOfRows(newValue);
    }
  };
  const handleChangeCols = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setNumOfCols(newValue);
    }
  };

  const calculateValue = (val: number) => {
    if (val <= 6) return 4 + val;
    else if (val <= 10) return 10 + 5 * (val - 6);
    else if (val <= 12) return 30 + 10 * (val - 10);
    else return 50 + 25 * (val - 12);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" bgcolor="#f8fafc">
        <Container>
          <Header />
          <ControlMenu
            rows={numOfRows}
            cols={numOfCols}
            handleChangeRows={handleChangeRows}
            handleChangeCols={handleChangeCols}
            calculateValue={calculateValue}
          />
          <Board
            size={
              {
                rows: calculateValue(numOfRows),
                cols: calculateValue(numOfCols),
              } as BoardSize
            }
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
