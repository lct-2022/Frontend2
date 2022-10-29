import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import './Login.css';
import { Props } from './types';
import { login, signup } from '../../api/passport';

const cn = 'login-form';

export const LoginForm: Props = ({isAuthorized}) => {
    // const isAuthorized = true;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const navigate = useNavigate();

    const btnName = isAuthorized
        ? 'Войти'
        : 'Зарегистрироваться'

    const loginAsync = useCallback(async () => {
        const requestResult = isAuthorized
            ? await login(email, password)
            : await signup(email, password)

        console.log(requestResult);

        navigate(`/user/:${requestResult.id}`);

        setEmail('');
        setPassword('');
    }, [email, password, isAuthorized]);

    return (
        <div className="login">
            <div className="login-form">


                <div className="login-form-wrapper">

                    <h3 className="login-form-title">Login</h3>

                    <div className="login-form-input">
                        <label htmlFor="login-form-mail" className="login-label">Email</label>
                        <input className="login-form-mail login-input" value={email} onChange={changeMail}/>
                    </div>

                    <div className="login-form-input">
                        <label htmlFor="login-form-password"  className="login-label">Password</label>
                        <input className="login-form-password login-input" value={password} onChange={changePassword}/>
                    </div>

                    <button
                        className="login-form-btn"
                        onClick={loginAsync}
                    >
                    {btnName}
                    </button>

                    <div id="divider"/>

                    <div>
                        
                    </div>

                </div>

            </div>
        </div>
    );
}

export default LoginForm;
