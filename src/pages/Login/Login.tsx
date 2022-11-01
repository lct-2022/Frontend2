import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { Props } from './types';
import { checkAuthorization, login, signup } from '../../api/passport';
import RedirectLoginBlock from './components/Redirect-Block';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { ActiveUserActions } from '../../store/types/activeUser';
import { isUserAuthorizedAction } from '../../store/actions/activeUser';
import { ROUTES } from '../../utils/routes';
import { setAuthToken } from '../../utils/cookie';

enum Labels {
    EMAIL = 'Email',
    PASSWORD = 'Password',
}

export const LoginForm: Props = ({type = 'login'}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //TODO Formik!!!
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const btnName = type === 'login'
        ? 'Войти'
        : 'Зарегистрироваться'

    const title = type === 'login'
        ? 'Войти'
        : 'Регистрация'

    const submit = useCallback(() => {
        const requestor = type === 'login'
            ? login
            : signup

        requestor(email, password)
            .then(({result}) => {
                dispatch<any>(isUserAuthorizedAction(result));
                setAuthToken(result);
                // Remove ???
                setEmail('');
                setPassword('');
                navigate(ROUTES.USER);
            })
            .catch(() => {
                throw new Error();
            })
    }, [email, password, type]);

    return (
        <div className="login">
            <div className="login-form">

                <div className="login-form-wrapper">

                    <p className="login-form-title">{title}</p>

                    <div className="login-form-input">
                        <label htmlFor="login-form-mail" className="login-label">
                            {Labels.EMAIL}
                        </label>

                        <input className="login-form-mail login-input" type="text" value={email} onChange={changeMail}/>
                    </div>

                    <div className="login-form-input">
                        <label htmlFor="login-form-password" className="login-label">
                            {Labels.PASSWORD}
                        </label>

                        <input className="login-form-password login-input" type="password" value={password} onChange={changePassword}/>
                    </div>

                    <button
                        className="login-form-btn"
                        onClick={submit}
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
