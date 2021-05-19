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
    updatePoseCompletion: (
      state,
      action: PayloadAction<{ id: string; percentage: number }>
    ) => {
      return {
        ...state,
        posesCompletion: state.posesCompletion.map((pose) =>
          pose.id === action.payload.id &&
          pose.percentage < action.payload.percentage
            ? { ...pose, percentage: action.payload.percentage }
            : pose
        ),
      };
    },
  },
});

export const {
  updateUser,
  logoutUser,
  updatePoseCompletion,
} = usersSlice.actions;
export const selectUsers = (state: RootState): UserDTO => state.users;
export default usersSlice.reducer;
