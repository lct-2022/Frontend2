import React, { RefObject, memo, useEffect, useMemo, useRef, useState } from 'react';
import {cn} from '@bem-react/classname';
import {useLocation} from 'react-router-dom'

import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import { LOGIN_POINT, NEW_PROJECT_POINT, MENU_POINTS } from './consts';
import { authUserSelector } from '../../store/selectors/users';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Drop from './components/Drop';
import Button from '../Button';

import './Navbar.css';

const userIcon = require('../../assets/user-icon.svg').default;
const ideaLogo = require('../../assets/logo.svg').default;

const cName = cn('navbar');

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isDropped, setIsDropped] = useState(false);

    const authUser = useSelector(authUserSelector);

    const isAuthorized = !!authUser;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            if (isDropped && ref.current && !ref.current.contains(event.target as Node)) {
                setIsDropped(false);
            }
        }

        document.addEventListener('click', clickOutsideHandler);

        return () => {
            document.removeEventListener('click', clickOutsideHandler);
        }
    }, [isDropped]);

    const changeDrop = () => {
        setIsDropped(prev => !prev);
    }

    const passToHome = () => {
        navigate(ROUTES.INDEX);    
    }

    const menuPoints = useMemo(() => {
        const menuWithLogin = isAuthorized
            ? {...MENU_POINTS, [NEW_PROJECT_POINT]: ROUTES.PROJECT_CREATE}
            : {...MENU_POINTS, [LOGIN_POINT]: ROUTES.LOGIN}

        return (
            <nav className={cName('menu')}>
                {Object.entries(menuWithLogin)
                    .map(([point, url]) => {
                        if (point !== NEW_PROJECT_POINT) {
                            return (
                                <NavLink
                                    key={point}
                                    className={cName('menu-point', {hidden: point === 'Мой профиль' && !isAuthorized})}
                                    to={url}
                                >
                                    {point}
                                </NavLink>
                            )
                        } else {
                            return (
                                <Button key={point} onClick={() => navigate(url)}>
                                    {point}
                                </Button>
                            )
                        }
                })}
            </nav>
        )
    }, [isAuthorized]);

    if (NOT_NAVBAR_ROUTES.includes(location.pathname)) {
        return null;
    }

    return (
        <div className={cName()}>
            <img 
                src={ideaLogo} 
                alt="Лого" 
                className={cName('main-logo')}
                onClick={passToHome}
            />
            
            <div className={cName('right-block')}>
                {menuPoints}

                {authUser && 
                    <>
                        <img 
                            src={isAuthorized ? authUser.avatar_url : userIcon} 
                            alt="В мой профиль"
                            onClick={changeDrop}
                            className={cName('user-icon')}
                        />

                        {isDropped && <Drop ref={ref}/>}
                    </>
                }
            </div>
        </div>
    )
}

export default memo(Navbar);