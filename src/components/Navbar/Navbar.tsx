import React, { memo, useMemo } from 'react';
import {useLocation} from 'react-router-dom'
import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import { LOGIN_POINT, NEW_PROJECT_POINT, MENU_POINTS } from './consts';
import { usersAvatarSelector, isUserAuthorizedSelector } from '../../store/selectors/activeUser';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import './Navbar.css';
import {cn} from '@bem-react/classname';

const cName = cn('navbar');

function Navbar() {
    const location = useLocation();

    const isAuthorized = useSelector(isUserAuthorizedSelector);
    const usersAvatar = useSelector(usersAvatarSelector);

    const menuPoints = useMemo(() => {
        const menuWithLogin = isAuthorized
            ? {...MENU_POINTS, [NEW_PROJECT_POINT]: ROUTES.PROJECT}
            : {...MENU_POINTS, [LOGIN_POINT]: ROUTES.LOGIN}

        return (
            <div className={cName('menu')}>
                {Object.entries(menuWithLogin).map(([point, url], index) => (
                    <a
                        key={index}
                        className={cName('menu-point')}
                        href={url}
                        target="_self"
                        rel="noopener noreferrer"
                    >
                        {point}
                    </a>
                ))}
            </div>
        )
    }, [isAuthorized]);

    if (NOT_NAVBAR_ROUTES.includes(location.pathname)) {
        return null;
    }

    return (
        <div className={cName()}>
            <img src={usersAvatar} alt="" className={cName('avatar')}/>

            {menuPoints}
        </div>
  )
}

export default memo(Navbar);