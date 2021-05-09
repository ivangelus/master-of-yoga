import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { UserDTO, initialStateUserDTO } from '../interfaces/UserDTO';

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateUserDTO,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserDTO>>) => {
      return { ...state, ...action.payload };
    },
    logoutUser: (state) => {
      return { ...state, ...initialStateUserDTO };
    },
  },
});

export const { updateUser, logoutUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
