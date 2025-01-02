import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from './store';
import { fetchUsersFromAPI } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './usersSlice';
import { setToken } from './authSlice';
import './styles/intro.css';
import './styles/globals.css';

export interface User {
  username: string;
  password: string;
  email: string;
  id: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsersFromAPI());
    console.log(users);
  }, [dispatch]);

  const handleLogin = async () => {
    setError(null); // Очистка ошибки перед попыткой входа
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUsername, password: inputPassword }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || 'Неверный логин или пароль');
        return;
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      console.log('Token saved:', data.token);

      // Сохраняем токен в Redux
      dispatch(setToken(data.token));

      // Загружаем защищенные данные
      await fetchProtectedData();

      navigate('/menu'); // Перенаправляем пользователя
    } catch (error) {
      console.error('Error during login:', error);
      setError('Не удалось подключиться к серверу');
    }
  };

  const fetchProtectedData = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:3001/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Protected data:', data);
      } else {
        console.error('Access denied');
      }
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex flex-col items-center align-middle space-y-10">
      <div className="intro flex-row items-center row-start-1">
        <h2 className="text-3xl p-6 m-1"> Добро пожаловать в MUStorage! </h2>
        <span className="text-base">
          Введите <b>логин</b> и <b>пароль</b>
        </span>
      </div>
      <div className="input flex flex-col items-start w-1/2">
        <input
          type="text"
          className="login p-2 border border-gray-300 rounded w-full"
          placeholder="Логин"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <input
          type="password"
          className="passwrd p-2 border border-gray-300 rounded w-full"
          placeholder="Пароль"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded align-middle"
        onClick={handleLogin}
      >
        Войти
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="hl_container flex flex-row justify-start gap-20">
        <div className="fp">
          <a href="#"> Забыли пароль? </a>
        </div>
        <div className="reg">
          <Link to="/registration" style={{ fontSize: '16px' }}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
