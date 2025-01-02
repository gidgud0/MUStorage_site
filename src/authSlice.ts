import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
interface TokenState {
    token: string | null;
}

const initialState: TokenState = {
    token: null,
};

const generateBase64Token = (length: number = 24): string => {
    const randomBytes = crypto.getRandomValues(new Uint8Array(length));
    return btoa(String.fromCharCode(...randomBytes)).slice(0, length);
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state) => {
        state.token = generateBase64Token();
    },
        clearToken: (state) => {
        state.token = null;
    },
  },
});

export const sendTokenToServer = createAsyncThunk(
    'token/sendTokenToServer',
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState() as { token: TokenState };
        const token = state.token.token;
  
        if (!token) {
          return rejectWithValue('Token is not available');
        }
  
        const response = await fetch('http://localhost:3001/tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to send token to server');
        }
  
        console.log('Token sent successfully');
        return token; // Можно вернуть токен, если требуется для дальнейшей обработки
      } catch (error: any) {
        console.error('Error sending token:', error);
        return rejectWithValue(error.message);
      }
    }
  );
  

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
