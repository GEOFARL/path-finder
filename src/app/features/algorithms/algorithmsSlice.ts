import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Algorithm, AnimationSpeed } from '../../../types';

export interface AlgorithmsState {
  type: Algorithm;
  speed: AnimationSpeed;
}

const initialState: AlgorithmsState = {
  type: 'A_STAR' as Algorithm,
  speed: AnimationSpeed.MEDIUM,
};

export const algorithmsSlice = createSlice({
  name: 'algorithms',
  initialState,
  reducers: {
    setAlgorithm: (state, action: PayloadAction<Algorithm>) => {
      state.type = action.payload;
    },
    setSpeed: (state, action: PayloadAction<AnimationSpeed>) => {
      state.speed = action.payload;
    },
  },
});

export const { setAlgorithm, setSpeed } = algorithmsSlice.actions;

export default algorithmsSlice.reducer;
