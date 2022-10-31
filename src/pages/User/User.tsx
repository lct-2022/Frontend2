import React, { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { getCurrentUserProfile } from '../../api/passport';
import { UserOptions } from './components/Options/Options';

import UserBusinessInfo from './components/BusinessInfo'
import UserCommonInfo from './components/CommonInfo'

import './User.css';
import { currentUserSelector } from '../../store/selectors/activeUser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const TITLE = 'Профиль';

export function Profile() {
    const navigate = useNavigate();

    const currentUser = useSelector(currentUserSelector);

    if (!currentUser) {
        navigate(ROUTES.LOGIN);
    }

    const userData = useMemo(() => {
        if (!currentUser) {
            return null;
        }

        return (
            <div className="profile-all-data">
                {Object.entries(currentUser).map(([key, value]) => (
                    <div
                        key={key}
                        className="profile-item"
                    >
                        {key}: {value}
                    </div>
                ))}
            </div>
        )
    }, [currentUser]);

    if (!currentUser) {
        navigate(ROUTES.LOGIN);
    }

    return (
        <div className="profile">
            <h1>{TITLE}</h1>

            {userData}
            {/* <UserBusinessInfo fio="currentUserData.fio"/> */}
            {/* <UserOptions/> */}
            {/* <UserCommonInfo data={}/> */}
        </div>
    );
}

export default Profile;