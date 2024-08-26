import React, { useState, ChangeEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Props } from './types';
import { getAuthorizedUser, login, signup } from '../../api/passport';
import RedirectLoginBlock from './components/Redirect-Block';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { AuthUserActions } from '../../store/types/authUser';
import { ROUTES } from '../../utils/routes';
import { setAuthToken } from '../../utils/cookie';
import { CurrentUserActions } from '../../store/types/currentUser';
import { cn } from '@bem-react/classname';
import { EMAIL_REGEXP } from '../../utils/consts';

import './Login.css';
import Text from '../../ui/Text';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const btnName = type === 'login'
        ? 'Войти'
        : 'Зарегистрироваться'

    const title = type === 'login'
        ? 'Войти'
        : 'Регистрация'

    const submit = useCallback(() => {
        if (!email.match(EMAIL_REGEXP)) {
            alert('Невалидный адрес электронный почты')
            return;
        }
        
        if (!email || !password || (type === 'signup' && (!name || !lastname))) {
            alert('Пожалуйста, заполните все поля!')
            return;
        }
        const requestor = type === 'login'
            ? login(email, password)
            : signup(email, password, `${name} ${lastname}`)

        requestor
            .then(token => {
                setAuthToken(token);
                return getAuthorizedUser(token);
            })
            .then(data => {
                dispatch({
                    type: AuthUserActions.SET_USER,
                    payload: data || null,
                })
                dispatch({
                    type: CurrentUserActions.SET_USER_SHOWN,
                    payload: data || null,
                })
            })
            .then(() => {
                setEmail('');
                setPassword('');
                navigate(ROUTES.USER);
            })
    }, [email, password, name, lastname, type]);

    return (
        <div className={cName()}>
            <Text className={cName('title')}>{title}</Text>

                <div className={cName('input', {hidden: type === 'login'})}>
                    <label htmlFor="name" className="login-label">
                        {Labels.NAME}
                    </label>

                    <input
                        className="login-form-mail login-input" 
                        name="name"
                        type="text"
                        placeholder={Placeholders.NAME}
                        value={name}
                        onChange={changeName}
                    />
                </div>

                <div className={cName('input', {hidden: type === 'login'})}>
                    <label htmlFor="lastname" className={cName('label')}>
                        {Labels.LASTNAME}
                    </label>

                    <input
                        className="login-form-mail login-input"
                        name="lastname"
                        type="text"
                        placeholder={Placeholders.LASTNAME}
                        value={lastname}
                        onChange={changeLastname}
                    />
                </div>

                <div className={cName('input')}>
                    <label htmlFor="email" className={cName('label')}>
                        {Labels.EMAIL}
                    </label>

                    <input
                        className="login-form-mail login-input"
                        type="email"
                        name="email"
                        placeholder={Placeholders.EMAIL}
                        value={email}
                        onChange={changeMail}
                    />
                </div>

                <div className={cName('input')}>
                    <label htmlFor="password" className={cName('label')}>
                        {Labels.PASSWORD}
                    </label>

                    <input
                        className="login-form-password login-input"
                        type="password"
                        name="password"
                        placeholder={Placeholders.PASSWORD}
                        value={password}
                        onChange={changePassword}
                    />
                </div>

                <Button className={cName('btn')} onClick={submit}>
                    {btnName}
                </Button>

                <div id="divider"/>
            <RedirectLoginBlock type={type}/>
        </div>
    );
}

export default LoginForm;
