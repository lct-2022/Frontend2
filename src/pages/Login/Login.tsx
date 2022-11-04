import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { Props } from './types';
import { authorize, login, signup } from '../../api/passport';
import RedirectLoginBlock from './components/Redirect-Block';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { ActiveUserActions } from '../../store/types/activeUser';
import { authorizeAction } from '../../store/actions/users';
import { ROUTES } from '../../utils/routes';
import { getTokenFromCookies, setAuthToken } from '../../utils/cookie';
import { ShownUserActions } from '../../store/types/shownUser';
import { cn } from '@bem-react/classname';

enum Labels {
    EMAIL = 'E-mail',
    PASSWORD = 'Password',
    NAME = 'Name',
    LASTNAME = 'Lastname',
}

enum Placeholders {
    EMAIL = 'Ваш e-mail',
    PASSWORD = 'Ваш пароль',
    NAME = 'Ваше имя',
    LASTNAME = 'Ваша фамилия',
}

const cName = cn('login-form')

export const LoginForm: Props = ({type = 'login'}) => {
    console.log('LOG !!!!!!');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //TODO Formik!!!
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const changeLastname = (event: ChangeEvent<HTMLInputElement>) => {
        setLastname(event.target.value)
    }
    console.log(type);
    
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
            .then(token => {
                setAuthToken(token);
                return new Promise((res) => {
                    res(dispatch<any>(authorizeAction(token)))
                })
            })
            .then(() => {
                setEmail('');
                setPassword('');
                navigate(ROUTES.USER);
            })
            .catch(() => {
                throw new Error();
            })
    }, [email, password, type]);

    return (
        <div className={cName()}>
            {/* <div className="login-form"> */}

                {/* <div className="login-form-wrapper"> */}

                    <p className={cName('title')}>{title}</p>

                    <div className={cName('input', {hidden: type === 'login'})}>
                        <label htmlFor="login-form-name" className="login-label">
                            {Labels.NAME}
                        </label>

                        <input className="login-form-mail login-input" type="text" placeholder={Placeholders.NAME} value={name} onChange={changeName}/>
                    </div>

                    <div className={cName('input', {hidden: type === 'login'})}>
                        <label htmlFor="login-form-lastname" className={cName('label')}>
                            {Labels.LASTNAME}
                        </label>

                        <input className="login-form-mail login-input" type="text" placeholder={Placeholders.LASTNAME} value={lastname} onChange={changeLastname}/>
                    </div>

                    <div className={cName('input')}>
                        <label htmlFor="login-form-mail" className={cName('label')}>
                            {Labels.EMAIL}
                        </label>

                        <input className="login-form-mail login-input" type="text" placeholder={Placeholders.EMAIL} value={email} onChange={changeMail}/>
                    </div>

                    <div className={cName('input')}>
                        <label htmlFor="login-form-password" className={cName('label')}>
                            {Labels.PASSWORD}
                        </label>

                        <input className="login-form-password login-input" type="password" placeholder={Placeholders.PASSWORD} value={password} onChange={changePassword}/>
                    </div>

                    <button
                        className={cName('btn')}
                        onClick={submit}
                    >
                        {btnName}
                    </button>

                    <div id="divider"/>

                    <RedirectLoginBlock type={type}/>
                {/* </div> */}

            {/* </div> */}
        </div>
    );
}

export default LoginForm;
