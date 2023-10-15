import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './features/board/boardSlice';
import algorithmsReducer from './features/algorithms/algorithmsSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    algorithms: algorithmsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
