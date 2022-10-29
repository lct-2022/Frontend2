import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const navigate = useNavigate();

    const loginAsync = useCallback(async () => {
        const url = 'https://passport.dev.lct.40ants.com';
        const body = {
            jsonrpc: '2.0',
            method: 'login',
            params: {
                email: email,
                password: password,
            },
            id: 0,
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
        const response = await fetch(url, options);

        if (response.ok) {
            const result = await response.json();
            console.log(result.result)
            setEmail('');
            setPassword('');
            navigate('/profile');
        } else {
            console.log('Error');
        }
    }, [email, password]);

    return (
        <div className="login_form">

            <h3>Login</h3>

                <div className="signup_input">
                    <label htmlFor="signup_mail">Email</label>
                    <input className="signup_mail" value={email} onChange={changeMail}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_password">Password</label>
                    <input className="signup_password" value={password} onChange={changePassword}/>
                </div>

                <button 
                    onClick={loginAsync}
                >
                    Войти
                </button>
        </div>
    );
}

export default LoginForm;
