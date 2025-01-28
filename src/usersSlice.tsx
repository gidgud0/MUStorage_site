import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Интерфейс пользователя
export interface User {
  username: string;
  password: string;
  email: string;
  id: string;
}

// Интерфейс состояния
interface UserState {
  users: User[]; // Все пользователи
  error: string | null; // Ошибки загрузки
  loading: boolean; // Индикатор загрузки
  confirmedUser: User | null; // Подтверждённый пользователь
}

// Начальное состояние
const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
  confirmedUser: null,
};

// Асинхронное действие для сохранения пользователя
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

// Асинхронное действие для получения списка пользователей
export const fetchUsersFromAPI = createAsyncThunk(
  'user/fetchUsersFromAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>('http://localhost:3001/users');
      console.log('Response data:', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const updateUserInAPI = createAsyncThunk(
  'user/updateUserInAPI',
  async (
    { id, newPassword }: { id: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`http://localhost:3001/users/${id}`, {
        password: newPassword,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

// Создание слайса
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserPassword(state, action: PayloadAction<{ id: string; newPassword: string }>) {
      const { id, newPassword } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.password = newPassword;
      }
    },
    // Добавить пользователя вручную
    setUserInfo(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.error = null;
    },
    // Установить ошибку
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // Установить подтверждённого пользователя
    setConfirmedUser(state, action: PayloadAction<User>) {
      state.confirmedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка пользователей
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
  
      // Сохранение пользователя
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
      })
  
      // Обновление пользователя
      .addCase(updateUserInAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInAPI.fulfilled, (state, action: PayloadAction<User>) => {
        const updatedUser = action.payload;
        const existingUser = state.users.find((user) => user.id === updatedUser.id);
        if (existingUser) {
          existingUser.password = updatedUser.password;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserInAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
})

// Экспорт действий
export const { setUserInfo, setError, setConfirmedUser, updateUserPassword } = userSlice.actions;

// Экспорт редьюсера
export default userSlice.reducer;
