import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { value: string } = {
  value: '',
};

export const currentPoseSlice = createSlice({
  name: 'currentPose',
  initialState,
  reducers: {
    changeCurrentPose: (state, action: PayloadAction<string>) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { changeCurrentPose } = currentPoseSlice.actions;
export const selectCurrentPose = (state: RootState): { value: string } =>
  state.currentPose;
export default currentPoseSlice.reducer;
