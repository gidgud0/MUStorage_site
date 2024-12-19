import { useState, useEffect } from 'react'
import './styles/App.css'
import Login from './login.tsx'
import { useAppDispatch, useAppSelector } from './usersSlice.tsx';
import { fetchUsersFromAPI } from './usersSlice';
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
      <Login />
    </>
  )
}

export default App


