// src/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  password: string;
  userId: string | null;
  error: string;
}

const initialState: UserState = {
  username: '',
  password: '',
  userId: null,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<{ username: string; password: string }>) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.userId = `${action.payload.username}-${Date.now()}`; // Пример генерации userId
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  }
});

export const { setUserInfo, setError } = userSlice.actions;

export default userSlice.reducer;
