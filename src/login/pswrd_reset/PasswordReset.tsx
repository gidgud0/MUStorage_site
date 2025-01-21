import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Reset() {
    const navigate = useNavigate();
    const emailNav = () => {
        navigate('/throughEmail');
    }
    const usernameNav = () => {
        navigate('/throughUsername');
    }


    return (
        <div className='contnr'>
            <p>Выберите метод сброса пароля</p>
            <div>
                <button onClick={usernameNav}>Username</button>
                <button onClick={emailNav}>Email</button>
            </div>
        </div>
    )
}

export default Reset