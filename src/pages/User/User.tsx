import React, { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import UserOptions from './components/Options';
import Bio from './components/Bio';


import './User.css';
import { currentUserSelector } from '../../store/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { getUserRatingAction } from '../../store/actions/rating';
import { getRating } from '../../api/passport';

const TITLE = 'Профиль';

export function Profile() {
    const currentUser = useSelector(currentUserSelector);

    const [userRating, setUserRating] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getRating('user', currentUser?.id ?? 0)
            .then(rating => {
                setUserRating(rating.result);
            })
    }, [currentUser]);
    
    if (!currentUser) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    return (
        <div className="profile">
            <h1>{TITLE}</h1>

            <Bio 
                user={currentUser}
                rating={userRating}
            />

            {/* <UserBusinessInfo fio="currentUserData.fio"/> */}
            {/* <UserCommonInfo data={}/> */}
        </div>
    );
}

export default Profile;