import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './styles/intro.css'
import './styles/globals.css'

function Login() {
    return (
        <> 
            <div className='container flex flex-col items-center align-middle space-y-10'>
                <div className='intro flex-row items-center row-start-1'>
                    <h2 className='text-3xl p-6 m-1'> Добро пожаловать в MUStorage! </h2>
                    <span className='text-base'> Введите <b>логин</b> и <b>пароль</b> </span>
                </div>
                <div className='input flex flex-col items-start w-1/2'>
                    <input 
                    type='text' 
                    className='login p-2 border border-gray-300 rounded w-full' 
                    placeholder='Логин'
                    />
                    <input type='password' className= 'passwrd p-2 border border-gray-300 rounded w-full' placeholder='Пароль' />
                </div>
                <div className='hl_container flex flex-row justify-start gap-20'>
                    <div className='fp'>
                        <a href='#'> Забыли пароль? </a>
                    </div>
                    <div className='reg'>
                        <a href='#'> Зарегистрироваться </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login