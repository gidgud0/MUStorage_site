import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles/intro.css';
import './styles/globals.css';
import { Link } from 'react-router-dom';
import { RootState } from './store';
import { setError, fetchUsersFromAPI } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './usersSlice';
import axios from 'axios';

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
  const users = useSelector((state: RootState) => state.user.users);
  const error = useSelector((state: RootState) => state.user.error);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsersFromAPI());
    console.log(users);
  }, [dispatch]);

  const handleLogin = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3001/users');
      const users = response.data;
  
      const user = users.find(
        (u) => u.username === inputUsername && u.password === inputPassword
      );
  
      if (user) {
        console.log('Логин успешен:', user);
        console.log('Передаем id в navigate:', user.id);
        navigate('/menu', { state: { id: user.id } });
      } else {
        dispatch(setError('Неверный логин или пароль'));
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
      dispatch(setError('Ошибка при проверке логина'));
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
          <Link to="/reset" style={{ fontSize: '16px' }}>
            Забыли пароль?
          </Link>
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
