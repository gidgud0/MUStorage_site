  import React, { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { saveUserToAPI, setError, useAppDispatch } from '../../../usersSlice'; // Импортируем действия
  import { Link } from 'react-router-dom';
  import './styles/App.css';
  import './styles/modal.css';
  import { RootState, AppDispatch } from '../../../store';

  function Registration() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRedo, setPasswordRedo] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setErrorState] = useState<string>('');
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const users = useSelector((state: RootState) => state.user.users);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      if (!username || !email || !password || !passwordRedo) {
        setErrorState('Все поля должны быть заполнены!');
        return;
      }
    
      if (password !== passwordRedo) {
        setErrorState('Пароли не совпадают');
        return;
      }
    
      const userExists = users.some((user) => user.username === username || user.email === email);
      if (userExists) {
        setErrorState('Логин или почта уже заняты');
        return;
      }
    
      setErrorState('');
    
      try {
        const id = `${username}-${Date.now()}`;
        await dispatch(saveUserToAPI({username, password, email, id}));
        setModalOpen(true);
      } catch (err: any) {
        setErrorState(err.message || 'Не удалось сохранить пользователя');
      }
    };

    return (
      <div className="contnr flex align-middle flex-col">
        <h3 className="reg">Регистрация</h3>
        <form onSubmit={handleSubmit} className="form flex flex-col">
          <label htmlFor="username">Введите ваш ник:</label>
          <input
            className="m-2 p-1"
            type="text"
            id="username"
            name="username"
            autoComplete='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Введите вашу почту:</label>
          <input
            className="m-2 p-1"
            type="email"
            id="email"
            name="email"
            autoComplete='username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="new-password">Введите ваш пароль:</label>
          <input
            className="m-2 p-1"
            type="password"
            id="new-password"
            name="new-password"
            autoComplete='new-password'
            value={password}
            onChange={handlePasswordChange}
          />

          <label htmlFor="password-redo">Введите пароль снова:</label>
          <input
            className="m-2 p-1"
            type="password"
            id="password-redo"
            name="password-redo"
            autoComplete='new-password'
            value={passwordRedo}
            onChange={handlePasswordRedoChange}
          />

          {error && <div className="text-red-500">{error}</div>}

          <button className="handleModal p-2 m-2" type="submit">
            Дальше
          </button>
          <Link
                to="/"
                className="text-blue-500 hover:underline"
              >
                Вернуться на главное меню
              </Link>
        </form>

        {isModalOpen && (
          <div className="modal flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50">
            <div className="modal-content bg-gray-800 p-6 rounded shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Регистрация успешна!</h2>
              <p className="mb-4">Добро пожаловать, {username}!</p>
              <Link
                to="/"
                className="text-blue-500 hover:underline"
              >
                Вернуться на главное меню
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Registration;
