import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles/intro.css';
import './styles/globals.css';
import { Link } from 'react-router-dom';
import { RootState } from './store';
import { setError, fetchUsersFromAPI } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './usersSlice';

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
  }, [dispatch]);

  const handleLogin = () => {
    if (!inputUsername.trim() || !inputPassword.trim()) {
      dispatch(setError('Enter login or password'));
      return;
    }

    const user = users.find(
      (user) => user.username === inputUsername && user.password === inputPassword
    );

    if (user) {
      console.log('Login successful!', user);
      dispatch(setError(''));
      navigate('/menu', { state: { userId: user.userId } });
    } else {
      dispatch(setError('Incorrect login or password'));
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
