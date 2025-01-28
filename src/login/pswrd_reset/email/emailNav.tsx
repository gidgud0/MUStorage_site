import "./styles/style.css"
import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../../../store';
import { saveUserToAPI, setError, useAppDispatch, fetchUsersFromAPI, setConfirmedUser, User } from '../../../usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// основная функция сброса пароля через почту
function EmailReset() {
    const [email, setEmail] = useState<string>('');
    const [foundEmail, setFoundEmail] = useState<boolean>(false);
    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useAppDispatch();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const [isCodeValid, setIsCodeValid] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [inputCode, setInputCode] = useState<string>('');
    const navigate = useNavigate();


    function confirmUserHandler(user: User) {
        dispatch(setConfirmedUser(user)); // Устанавливаем подтверждённого пользователя
        console.log('Подтверждённый пользователь:', user);
      }

    // Генерация кода для подтверждения почты
    function generateSixDigitCodeString(): string {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Генеиация кода 6-значная, тоесть минимально 100000 и максимально 900000
    }

    // Закрытие всплывающего окна
    function closeModal() {
        setModalOpen(false);
        return
    }

    // Фетч всех пользователей из базы данных
    useEffect(() => {
        dispatch(fetchUsersFromAPI());
        console.log(users);
      }, [dispatch]);

    // Проверка на валидантность кода при верификации почты /дебаг
    useEffect(() => {
        if (isCodeValid) {
            console.log('Код стал валидным: ', code);
        }
    }, [isCodeValid]);

    // Автоматическое продолжение при нажатии клавиши Enter после ввода данных в Input
    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>, context: string) {
        if (event.key === 'Enter') {
            if (context === 'email') {
                handleEmailFind();
            } else if (context === 'code') {
                handleCodeCheck();
            }
        }
    }

    // Основной хэндлер на поиск почты из массива данных
    function handleEmailFind() {
        const newCode = generateSixDigitCodeString();
        const emailExists = users.some(user => 
            user.email.toLowerCase() === email.trim().toLowerCase()
        );
        console.log("найдена почта из массива: ", email, ", статус проверки: ", emailExists);
        if(emailExists == true) {
            setCode(newCode);
            setIsCodeValid(true);
            console.log('новый код: ', newCode, ', состояние: true')
        };
        setFoundEmail(emailExists);
        setModalOpen(emailExists);
        return;
    }
    
    // Проверка кода
    function handleCodeCheck() {
        if (inputCode === code) {
            setConfirm(true);
            console.log("Код подтверждён!");
            closeModal();
    
            // Здесь вызываем confirmUserHandler, передавая пользователя
            const confirmedUser = users.find(user => user.email.toLowerCase() === email.trim().toLowerCase());
            if (confirmedUser) {
                confirmUserHandler(confirmedUser);
            }
    
            // Перенаправление на страницу сброса пароля
            navigate("/PasswordReset", { state: { users } });
        } else {
            setConfirm(false);
            console.log("Неверный код, попробуйте снова!");
        }
    }


    // Большая часть CSS была сделана с помощью Tailwind CSS
    return (
        <div className="contnr">
            <input 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full"
            placeholder="Введите вашу почту"
            onKeyDown={(e) => handleKeyPress(e, 'email')}
            >
            </input>
            <button
             className="accept p-2"
             onClick={handleEmailFind}
             > Продолжить </button>
            {isModalOpen && (
            <div className="modal flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50">
                <div className="modal-content bg-gray-800 p-6 rounded shadow-lg text-center">
                    
                    <h2> Введите код, который был отправлен на почту {email}. </h2>
                    <input 
                    placeholder="Ваш 6-значный код"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, 'code')}
                    ></input>
                    <div>
                        <button onClick={closeModal}> Назад </button>
                        <button onClick={handleCodeCheck}> Продолжить </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )   
}

export default EmailReset