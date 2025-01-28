import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../usersSlice';
import { updateUserPassword } from '../../../usersSlice'; // Функция для обновления пароля в Redux
import { updateUserInAPI } from '../../../usersSlice'; // Новый Thunk для обновления пароля в API

function PasswordReset() {
  const dispatch = useAppDispatch();
  const confirmedUser = useAppSelector((state) => state.user.confirmedUser);
  const users = useAppSelector((state) => state.user.users);

  const [password, setPassword] = useState<string>('');
  const [passwordRedo, setPasswordRedo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const resetPassword = async () => {
    if (!confirmedUser) {
      setError('Пользователь не найден');
      return;
    }

    const oldPassword = users.find((user) => user.id === confirmedUser.id)?.password;

    if (!password || !passwordRedo) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (password === oldPassword) {
      setError('Новый пароль не может совпадать со старым');
      return;
    }

    if (password !== passwordRedo) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      // Обновление состояния пользователя в Redux
      dispatch(updateUserPassword({ id: confirmedUser.id, newPassword: password }));

      // Отправка обновления на сервер
      await dispatch(updateUserInAPI({ id: confirmedUser.id, newPassword: password })).unwrap();

      setError('');
      setSuccess('Пароль успешно обновлён!');
      setPassword('');
      setPasswordRedo('');
    } catch (apiError: any) {
      setError(apiError || 'Ошибка обновления пароля на сервере');
    }
  };

  return (
    <div>
      <h1>Сброс пароля</h1>
      {confirmedUser ? (
        <div>
          <p>Email: {confirmedUser.email}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              resetPassword();
            }}
            className="flex flex-col gap-4"
          >
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <input
              type="password"
              placeholder="Введите новый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Подтвердите новый пароль"
              value={passwordRedo}
              onChange={(e) => setPasswordRedo(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Сбросить пароль
            </button>
          </form>
        </div>
      ) : (
        <p>Информация о пользователе не найдена</p>
      )}
    </div>
  );
}

export default PasswordReset;
