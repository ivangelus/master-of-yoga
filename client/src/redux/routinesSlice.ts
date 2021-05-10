import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { BaseRoutinesDTO } from '../interfaces/RoutineDTO';

const initialState: BaseRoutinesDTO = {};

export const routinesSlice = createSlice({
  name: 'routines',
  initialState,
  reducers: {
    updateRoutines: (state, action: PayloadAction<BaseRoutinesDTO>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateRoutines } = routinesSlice.actions;
export const selectRoutines = (state: RootState) => state.routines;
export default routinesSlice.reducer;
