import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { Props } from './types';
import { login, signup } from '../../api/passport';
import RedirectLoginBlock from './components/Redirect-Block';
import Button from '../../components/Button';

export const LoginForm: Props = ({type = 'login'}) => {
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

    const btnName = type === 'login'
        ? 'Войти'
        : 'Зарегистрироваться'

    const loginAsync = useCallback(async () => {
        const requestResult = type === 'login'
            ? await login(email, password)
            : await signup(email, password)

        console.log(requestResult);

        navigate(`/user/:${requestResult.id}`);

        // Remove ???
        setEmail('');
        setPassword('');
    }, [email, password, type]);

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
                    
                    {/* <Button type="secondary">
                        {btnName}
                    </Button> */}

                    <button
                        className="login-form-btn"
                        onClick={loginAsync}
                    >
                        {btnName}
                    </button>

                    <div id="divider"/>

                    <RedirectLoginBlock type={type}/>
                </div>

            </div>
        </div>
    );
}

export default LoginForm;
