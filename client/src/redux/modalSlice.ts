import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { value: boolean } = {
  value: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      return { ...state, value: true };
    },
    closeModal: (state) => {
      return { ...state, value: false };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState): { value: boolean } =>
  state.modal;
export default modalSlice.reducer;
