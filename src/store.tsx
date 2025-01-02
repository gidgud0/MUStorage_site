import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import tokenReducer from './authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
