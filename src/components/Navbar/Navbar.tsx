import React, { memo, useMemo } from 'react';
import {useLocation} from 'react-router-dom'
import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import { LOGIN_POINT, NEW_PROJECT_POINT, MENU_POINTS } from './consts';
import { usersAvatarSelector, isUserAuthorizedSelector } from '../../store/selectors/activeUser';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {cn} from '@bem-react/classname';
import './Navbar.css';
import { DEFAULT_LOGO } from '../../utils/consts';

const cName = cn('navbar');

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthorized = useSelector(isUserAuthorizedSelector);
    console.log(isAuthorized);
    
    const usersAvatar = useSelector(usersAvatarSelector);

    const passToHome = () => {
        navigate(ROUTES.INDEX);    
    }

    const menuPoints = useMemo(() => {
        const menuWithLogin = isAuthorized
            ? {...MENU_POINTS, [NEW_PROJECT_POINT]: ROUTES.PROJECT_CREATE}
            : {...MENU_POINTS, [LOGIN_POINT]: ROUTES.LOGIN}

        return (
            <div className={cName('menu')}>
                {Object.entries(menuWithLogin).map(([point, url], index) => {
                    if (point !== NEW_PROJECT_POINT) {
                        return (
                            <a
                                key={index}
                                className={cName('menu-point')}
                                href={url}
                                target="_self"
                                rel="noopener noreferrer"
                            >
                                {point}
                            </a>
                        )
                    } else {
                        return (
                            <a 
                                key={index}
                                className={cName('menu-point')}
                                href={url}
                                target="_self"
                                rel="noopener noreferrer"
                            >
                                <button>
                                    {point}
                                </button>
                            </a>
                        )
                    }
                })
            }
            </div>
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

            {menuPoints}
        </div>
  )
}

export default memo(Navbar);