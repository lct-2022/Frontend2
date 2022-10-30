import React, { memo, useMemo } from 'react';
import {useLocation} from 'react-router-dom'
import { NOT_NAVBAR_ROUTES, ROUTES } from '../../utils/routes';
import './Navbar.css';
import { LOGIN_POINT, LOGOUT_POINT, MENU_POINTS } from './consts';
// import { useSelector } from 'react-redux';

function Navbar() {
    const isAuthorized = true;
    // useSelector(() => {});

    const location = useLocation()

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
          <img src="" alt="" className="project-logo"/>

          {menuPoints}
      </div>
  )
}

export default memo(Navbar);