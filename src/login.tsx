import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './styles/intro.css'

function Login() {
    return (
        <> 
            <div className='container flex-row items-center align-middle space-y-10'>
                <div className='intro flex-row items-center row-start-1'>
                    <h2> Добро пожаловать! </h2>
                    <span> Введите <b>логин</b> и <b>пароль</b> </span>
                </div>
                <div className='input flex flex-row items-start'>
                    <input type='text' className='flex p-2 border border-gray-300 rounded' placeholder='Логин' />
                    <input type='password' className= 'flex p-2 border border-gray-300 rounded' placeholder='Пароль' />
                </div>
            </div>
        </>
    )
}

export default Login