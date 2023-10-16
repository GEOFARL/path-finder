import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Algorithm, AnimationSpeed } from '../../../types';
import { RootState } from '../../store';

const SPEED_TABLE = {
  [AnimationSpeed.FAST]: 15,
  [AnimationSpeed.MEDIUM]: 40,
  [AnimationSpeed.SLOW]: 100,
};

export interface AlgorithmsState {
  type: Algorithm;
  speed: number;
}

const initialState: AlgorithmsState = {
  type: 'A_STAR' as Algorithm,
  speed: SPEED_TABLE[AnimationSpeed.MEDIUM],
};

export const algorithmsSlice = createSlice({
  name: 'algorithms',
  initialState,
  reducers: {
    setAlgorithm: (state, action: PayloadAction<Algorithm>) => {
      state.type = action.payload;
    },
    setSpeed: (state, action: PayloadAction<AnimationSpeed>) => {
      state.speed = SPEED_TABLE[action.payload];
    },
  },
});

export const selectAlgorithm = createSelector(
  (state: RootState) => state.algorithms,
  (algorithms) => algorithms
);

export const selectAnimationSpeed = createSelector(
  (state: RootState) => state.algorithms,
  (algorithms) => algorithms.speed
);

export const selectAnimationSpeedType = createSelector(
  (state: RootState) => state.algorithms,
  (algorithms) =>
    Object.keys(SPEED_TABLE).find(
      (key: string) => SPEED_TABLE[key as AnimationSpeed] === algorithms.speed
    )
);

export const { setAlgorithm, setSpeed } = algorithmsSlice.actions;

export default algorithmsSlice.reducer;
