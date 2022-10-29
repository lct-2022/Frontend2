import React, { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom'
import './App.css';
// import { useSelector } from 'react-redux';

const MENU_POINTS = {
    'Эксперты': '/',
    'Проекты': '/',
    'Cервисы': '/',
    'Вакансии': '/',
}

const LOGOUT_POINT = 'Выйти';
const SIGNUP_POINT = 'Регистрация';
const LOGIN_POINT = 'Войти';

function Navbar() {
    const isAuthorized = true;
    // useSelector(() => {});

    const menuPoints = useMemo(() => {
        const menuWithLogin = isAuthorized
            ? {...MENU_POINTS, [LOGOUT_POINT]: '/'}
            : {...MENU_POINTS, [SIGNUP_POINT]: '/', [LOGIN_POINT]: '/'}

        return (
            <ul>
                {Object.entries(menuWithLogin).map(([point, url], index) => (
                    <a
                        key={index}
                        className="navbar_menu_point"
                        href={url}
                        target="_self"
                        rel="noopener noreferrer"
                    >
                        {point}
                    </a>
                ))}

            </ul>
        )
    }, [isAuthorized]);

    return (
      <div className="navbar_menu">
          {menuPoints}
      </div>
  )
}

export default memo(Navbar);