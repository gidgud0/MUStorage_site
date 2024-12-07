import { useState } from 'react'
import './styles/App.css'
import Login from './login.tsx'
import PokemonFetcher from './response.tsx';

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice.tsx';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

function App() {
  return (
    <>
      <PokemonFetcher />
      <Login />
    </>
  )
}

export default App


