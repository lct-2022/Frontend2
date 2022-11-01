import React, { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import UserOptions from './components/Options';
import Bio from './components/Bio';


import './User.css';
import { currentUserSelector } from '../../store/selectors/users';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const TITLE = 'Профиль';

export function Profile() {
    const currentUser = useSelector(currentUserSelector);
    const navigate = useNavigate();
    console.log(currentUser);
    
    if (!currentUser) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    return (
        <div className="profile">
            <h1>{TITLE}</h1>

            <div></div>

            <UserOptions/>

            <Bio user={currentUser}/>

            {/* <UserBusinessInfo fio="currentUserData.fio"/> */}
            {/* <UserCommonInfo data={}/> */}
        </div>
    );
}

export default Profile;