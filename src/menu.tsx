import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './usersSlice';
import { User } from './usersSlice';

function Menu() {
  const location = useLocation();
  const userId = location.state?.userId;
  const users = useAppSelector((state) => state.user.users);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('User not found');
      return;
    }

    console.log('Users from Redux:', users);

    const foundUser = users.find((user) => user.userId === userId);

    if (foundUser) {
      setUser(foundUser);
    } else {
      setError('User not found');
    }
  }, [userId, users]);

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <div>
          <h1>Добро пожаловать, {user.username}</h1>
          <p>Ваш email: {user.email}</p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default Menu;
