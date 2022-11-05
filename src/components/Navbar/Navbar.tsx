import React, { memo, useMemo, useState } from 'react';
import {useLocation} from 'react-router-dom'
import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import { LOGIN_POINT, NEW_PROJECT_POINT, MENU_POINTS } from './consts';
import { usersAvatarSelector, authUserSelector } from '../../store/selectors/users';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {cn} from '@bem-react/classname';
import './Navbar.css';
import { DEFAULT_LOGO, TOKEN_KEY } from '../../utils/consts';
import { NavLink } from 'react-router-dom';
import { getTokenFromCookies, removeAuthToken } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { AuthUserActions } from '../../store/types/activeUser';
import Drop from './components/Drop';
import { lsRemoveAuthorizedUser } from '../../utils/storage';
import Button from '../Button';
const userIcon = require('../../assets/user-icon.svg').default;

const cName = cn('navbar');

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeUser = useSelector(authUserSelector);

    const [isDropped, setIsDropped] = useState(false);

    const isAuthorized = !!activeUser;

    const drop = () => {
        setIsDropped(prev => !prev);
    }

    const passToHome = () => {
        navigate(ROUTES.INDEX);    
    }

    const passToMyProfile = () => {
        navigate(ROUTES.USER);
    }

    const logout = () => {
        removeAuthToken(TOKEN_KEY);
        lsRemoveAuthorizedUser();
        dispatch({
            type: AuthUserActions.UNSET_USER,
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
                            <Button key={index} onClick={() => navigate(url)}>
                                {point}
                            </Button>
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
            
            <div className={cName('right-block')}>
                {menuPoints}

                {activeUser && 
                    <>
                        <img 
                            src={userIcon} 
                            alt="В мой профиль"
                            onClick={drop}
                            className={cName('user-icon')}
                        />

                        {isDropped && <Drop passToMyProfile={passToMyProfile} logout={logout}/>}
                    </>
                }
            </div>
        </div>
  )
}

export default memo(Navbar);