import React, { memo, useMemo } from 'react';
import {useLocation} from 'react-router-dom'
import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import { LOGIN_POINT, NEW_PROJECT_POINT, MENU_POINTS } from './consts';
import { usersAvatarSelector, currentUserSelector } from '../../store/selectors/users';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {cn} from '@bem-react/classname';
import './Navbar.css';
import { DEFAULT_LOGO, TOKEN_KEY } from '../../utils/consts';
import { NavLink } from 'react-router-dom';
import { getTokenFromCookies, removeAuthToken } from '../../utils/cookie';
import { authorizeAction } from '../../store/actions/users';
import { useDispatch } from 'react-redux';
import { ActiveUserActions } from '../../store/types/activeUser';

const cName = cn('navbar');

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector(currentUserSelector);
    const isAuthorized = !!currentUser;

    const passToHome = () => {
        navigate(ROUTES.INDEX);    
    }

    const logout = () => {
        removeAuthToken(TOKEN_KEY);
        dispatch({
            type: ActiveUserActions.UNSET_USER,
        });
        navigate(ROUTES.INDEX);
    }

    const menuPoints = useMemo(() => {
        const menuWithLogin = isAuthorized
            ? {...MENU_POINTS, [NEW_PROJECT_POINT]: ROUTES.PROJECT_CREATE}
            : {...MENU_POINTS, [LOGIN_POINT]: ROUTES.LOGIN}

        return (
            <nav className={cName('menu')}>
                {Object.entries(menuWithLogin).map(([point, url], index) => {
                    if (point !== NEW_PROJECT_POINT) {
                        return (
                            <NavLink
                                key={index}
                                className={cName('menu-point', {hidden: point === 'Мой профиль' && !isAuthorized})}
                                to={url}
                            >
                                {point}
                            </NavLink>
                        )
                    } else {
                        return (
                            <button key={index} onClick={() => navigate(url)}>
                                {point}
                            </button>
                        )
                    }
                })
            }
            </nav>
        )
    }, [isAuthorized]);

    if (NOT_NAVBAR_ROUTES.includes(location.pathname)) {
        return null;
    }

    return (
        <div className={cName()}>
            <img 
                src={DEFAULT_LOGO} 
                alt="Лого" 
                className={cName('main-logo')}
                onClick={passToHome}
            />
            
            {currentUser && <button onClick={logout}>Logout</button>}

            {menuPoints}
        </div>
  )
}

export default memo(Navbar);