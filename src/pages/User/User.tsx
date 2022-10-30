import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { getCurrentUserProfile } from '../../api/passport';
import { UserOptions } from './components/Options/Options';

import UserBusinessInfo from './components/BusinessInfo'
import UserCommonInfo from './components/CommonInfo'

import './User.css';
// import { useSelector } from 'react-redux';

export function User() {
    // const currentUserData = useSelector(...)

    // TODO: add preloader
    useEffect(() => {
        getCurrentUserProfile('');
        // Ручка получения рейтинга
    }, []);

    return (
        <div className="">
            <h1>Профиль</h1>
            {/* <UserBusinessInfo fio="currentUserData.fio"/> */}
            {/* <UserOptions/> */}
            {/* <UserCommonInfo data={}/> */}
        </div>
    );
}

export default User;