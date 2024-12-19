import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch; // Создаем тип для dispatch
export type RootState = ReturnType<typeof store.getState>; // Тип для state

export default store;