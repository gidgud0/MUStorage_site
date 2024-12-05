import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  password: string;
}

type UsersState = User[];

const initialState: UsersState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newUser: User = {
        id: Date.now(),
        ...action.payload,
      };
      state.push(newUser);
    },
    updateUserPassword: (
      state,
      action: PayloadAction<{ id: number; newPassword: string }>
    ) => {
      const { id, newPassword } = action.payload;
      const user = state.find((user) => user.id === id);
      if (user) {
        user.password = newPassword;
      }
    },
  },
});

export const { addUser, updateUserPassword } = usersSlice.actions;
export default usersSlice.reducer;
