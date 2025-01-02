// src/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface User {
  username: string;
  password: string;
  email: string;
  id: string;
}

interface UserState {
  users: User[];
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
};

export const saveUserToAPI = createAsyncThunk(
  'user/saveUserToAPI',
  async (user: Omit<User, 'userId'>, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/users', user);
      console.log('fetch successful!');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save user');
    }
  }
);

export const fetchUsersFromAPI = createAsyncThunk(
  'user/fetchUsersFromAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>('http://localhost:3001/users');

      // Вывод типа данных
      console.log('Response type:', typeof response.data); // Вернет "object" в runtime
      console.log('Response data:', response.data); // Фактический массив данных
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersFromAPI.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchUsersFromAPI.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload; 
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsersFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(saveUserToAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveUserToAPI.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(saveUserToAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserInfo, setError } = userSlice.actions;

export default userSlice.reducer;
