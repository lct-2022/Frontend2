import React, { memo, useMemo } from 'react';
import {useLocation} from 'react-router-dom'
import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import './Navbar.css';
import { LOGIN_POINT, LOGOUT_POINT, MENU_POINTS } from './consts';
import { usersAvatarSelector, isUserAuthorizedSelector } from '../../store/selectors/activeUser';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

function Navbar() {
    const isAuthorized = useSelector(isUserAuthorizedSelector);
    const usersAvatar = useSelector(usersAvatarSelector);

    const location = useLocation();

    const menuPoints = useMemo(() => {
        const menuWithLogin = isAuthorized
            ? {...MENU_POINTS, [LOGOUT_POINT]: ROUTES.INDEX}
            : {...MENU_POINTS, [LOGIN_POINT]: ROUTES.LOGIN}

        return (
            <div className="navbar-menu">
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
            </div>
        )
    }, [isAuthorized]);

    if (NOT_NAVBAR_ROUTES.includes(location.pathname)) {
        return null;
    }

    return (
      <div className="navbar">
          <img src={usersAvatar} alt="" className="avatar"/>

          {menuPoints}
      </div>
  )
}

export default memo(Navbar);