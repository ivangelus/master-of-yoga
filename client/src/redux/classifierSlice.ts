import {
  initialStateClassifier,
  Classifier,
} from '../interfaces/ClassifierDTO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const classifierSlice = createSlice({
  name: 'classifier',
  initialState: initialStateClassifier,
  reducers: {
    loadModel: (state, action: PayloadAction<Partial<Classifier>>) => {
      return { ...state, ...action.payload, isReady: true };
    },
  },
});

export const { loadModel } = classifierSlice.actions;
export const selectClassifier = (state: RootState): Classifier =>
  state.classifier;
export default classifierSlice.reducer;
