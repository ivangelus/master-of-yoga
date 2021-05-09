import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
