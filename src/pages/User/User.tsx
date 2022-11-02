import React, { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import UserOptions from './components/Options';
import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';

import './User.css';
import { currentUserSelector } from '../../store/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { getUserRatingAction } from '../../store/actions/rating';
import { getRating } from '../../api/passport';


import {cn} from '@bem-react/classname';
const TITLE = 'Профиль';

const cName = cn('profile');

export function Profile() {
    const currentUser = useSelector(currentUserSelector);

    const [userRating, setUserRating] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getRating('user', currentUser?.user?.id ?? 0)
            .then(rating => {
                setUserRating(rating.result);
            })
    }, [currentUser]);
    
    if (!currentUser) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    return (
        <div className={cName()}>
            <h1>{TITLE}</h1>

            <Bio 
                user={currentUser}
                rating={userRating}
            />

            <div className={cName('down')}>
                <UserRoutes user={currentUser}/>
                <Contacts user={currentUser}/>
            </div>
        </div>
    );
}

export default Profile;