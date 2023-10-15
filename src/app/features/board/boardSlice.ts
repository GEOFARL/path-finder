import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_END_POSITION,
  DEFAULT_NUMBER_OF_COLS,
  DEFAULT_NUMBER_OF_ROWS,
  DEFAULT_START_POSITION,
} from '../../../constants';
import { Position } from '../../../types';

export interface BoardState {
  numOfRows: number;
  numOfCols: number;
  cellSize: number;
  startPosition: Position;
  endPosition: Position;
  walls: Position[];
  isMousePressed: boolean;
}

const initialState: BoardState = {
  numOfRows: DEFAULT_NUMBER_OF_ROWS,
  numOfCols: DEFAULT_NUMBER_OF_COLS,
  cellSize: 0,
  startPosition: DEFAULT_START_POSITION,
  endPosition: DEFAULT_END_POSITION,
  walls: [],
  isMousePressed: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setNumberOfRows: (state, action: PayloadAction<number>) => {
      state.numOfRows = action.payload;
    },
    setNumberOfCols: (state, action: PayloadAction<number>) => {
      state.numOfCols = action.payload;
    },
    setCellSize: (state, action: PayloadAction<number>) => {
      state.cellSize = action.payload;
    },
    setStartPosition: (state, action: PayloadAction<Position>) => {
      state.startPosition = action.payload;
    },
    setEndPosition: (state, action: PayloadAction<Position>) => {
      state.endPosition = action.payload;
    },
    addWall: (state, action: PayloadAction<Position>) => {
      state.walls.push(action.payload);
    },
    removeWall: (state, action: PayloadAction<Position>) => {
      const { row, col } = action.payload;
      state.walls = state.walls.filter(
        (wallPos) => wallPos.row !== row || wallPos.col !== col
      );
    },
    setIsMousePressed: (state, action: PayloadAction<boolean>) => {
      state.isMousePressed = action.payload;
    },
  },
});

export const {
  setNumberOfCols,
  setNumberOfRows,
  setCellSize,
  setStartPosition,
  setEndPosition,
  addWall,
  removeWall,
  setIsMousePressed,
} = boardSlice.actions;

export default boardSlice.reducer;
