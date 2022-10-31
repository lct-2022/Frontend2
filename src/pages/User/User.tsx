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
import { IUser } from '../../types';
import { prepareProfileItems } from './utils';
// IUser
const TITLE = 'Профиль';
const notPublicItems: Array<keyof IUser> = [
    'created-at',
    'updated-at',
    'password-hash',
    'avatar-url',
    'synced',
    'id',
]

export function Profile() {
    const navigate = useNavigate();

    const currentUser = useSelector(currentUserSelector);
    console.log(currentUser);
    
    if (!currentUser) {
        navigate(ROUTES.LOGIN);
    }

    const userData = useMemo(() => {
        if (!currentUser) {
            return null;
        }
        // console.log(prepareProfileItems(Object.entries(currentUser)));
        
        return (
            <div className="profile-all-data">
                {(Object.entries(prepareProfileItems(currentUser))).map(([key, value]) => (
                    <div
                        key={key}
                        className="profile-item"
                    >
                        {key}:&nbsp;{value}
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