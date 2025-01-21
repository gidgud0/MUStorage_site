import "./styles/style.css"
import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../../../store';
import { saveUserToAPI, setError, useAppDispatch, fetchUsersFromAPI } from '../../../usersSlice';
import { useDispatch, useSelector } from 'react-redux';


function EmailReset() {
    const [email, setEmail] = useState<string>('');
    const [foundEmail, setFoundEmail] = useState<boolean>(false);
    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useAppDispatch();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchUsersFromAPI());
        console.log(users);
      }, [dispatch]);
    
    function handleEmailFind() {
        const emailExists = users.some(user => 
            user.email.toLowerCase() === email.trim().toLowerCase()
        );
        console.log("найдена почта из массива: ", email, ", статус проверки: ", emailExists);
        setFoundEmail(emailExists);
        setModalOpen(emailExists);
        return;
    }
    

    return (
        <div className="contnr">
            <input 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full"
            placeholder="Введите вашу почту"
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
                    
                    ></input>
                </div>
            </div>
            )}
        </div>
    )   
}

export default EmailReset