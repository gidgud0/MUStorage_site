// src/App.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setError } from '../../../usersSlice'; // Импортируем действия
import './styles/App.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRedo, setPasswordRedo] = useState<string>('');
  const [error, setErrorState] = useState<string>('');
  const userId = useSelector((state: any) => state.user.userId); // Получаем userId из Redux
  const dispatch = useDispatch();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordRedoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRedo(e.target.value);

    if (e.target.value !== password) {
      setErrorState('Пароли не совпадают');
    } else {
      setErrorState('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordRedo) {
      dispatch(setError('Пароли не совпадают'));
      return;
    }

    dispatch(setUserInfo({ username, password }));
    console.log('Форма отправлена с данными:', { username, password, userId });
  };

  return (
    <div className="container flex align-middle flex-col">
      <h3 className="reg">Регистрация</h3>
      <form onSubmit={handleSubmit} className="form flex flex-col">
        <label htmlFor="username">Введите ваш ник:</label>
        <input
          className="m-2 p-1"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Введите вашу почту:</label>
        <input className="m-2 p-1" type="email" id="email" name="email" />

        <label htmlFor="password">Введите ваш пароль:</label>
        <input
          className="m-2 p-1"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label htmlFor="password-redo">Введите пароль снова:</label>
        <input
          className="m-2 p-1"
          type="password"
          id="password-redo"
          name="password-redo"
          value={passwordRedo}
          onChange={handlePasswordRedoChange}
        />

        {error && <div className="text-red-500">{error}</div>}

        <button className="p-2 m-2" type="submit">
          Дальше
        </button>
      </form>
    </div>
  );
}

export default App;
