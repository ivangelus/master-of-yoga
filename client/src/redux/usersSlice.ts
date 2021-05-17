import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import {
  UserDTO,
  initialStateUserDTO,
  PoseCompletionDTO,
} from '../interfaces/UserDTO';

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
    // updatePoseCompletion: (state, action: PayloadAction<Partial<PoseCompletionDTO>>) => {
    //   return {
    //     ...state,
    //     posesCompletion: state.posesCompletion.map(
    //         (pose, i) => pose.id === action.payload.id ? {...pose, percentage: action.payload.percentage} : pose
    //     )
    //  }
    // },
  },
});

export const { updateUser, logoutUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
