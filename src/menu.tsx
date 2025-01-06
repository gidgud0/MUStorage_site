import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './usersSlice';
import { User } from './usersSlice';

function Menu() {
  const location = useLocation();
  const userId = location.state?.id;
  const users = useAppSelector((state) => state.user.users); // Берем список пользователей из Redux
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {

    if (!userId) {
      setError('Пользователь не найден');
      console.log("Текущий айди пользователя: ", userId)
      console.log('Текущие пользователи: ', users)
      return;
    }

    if (users.length === 0) {
      setError('Пользователи не загружены');
      return;
    }

    // Ищем пользователя в списке
    const foundUser = users.find((u) => u.id === userId);

    if (foundUser) {
      setUser(foundUser);
      setError('');
    } else {
      setUser(null);
      setError('Пользователь не найден');
    }
  }, [userId, users]);

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <div className='max-w-full h-full flex flex-row'>
            <header className='w-full h-1'>
                <h1> Mustorage </h1>
            </header>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default Menu;
