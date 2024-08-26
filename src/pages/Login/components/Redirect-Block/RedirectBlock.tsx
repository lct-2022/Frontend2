import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Props } from './types';

const RedirectLoginBlock: Props = ({type}) => {
    if (type === 'login') {
        return (
            <>
                <p>У Вас нет аккаунта?</p>
                <NavLink to="/signup">Регистрация</NavLink>            
            </>
        )
    } else {
        return (
            <>
                <p>У Вас есть аккаунт?</p>
                <NavLink to="/login">Войти</NavLink> 
            </>
        )
    }
}

export default memo(RedirectLoginBlock);