import React, { useState, ChangeEvent, useCallback, useEffect, useMemo, memo } from 'react';
import UserOptions from './components/Options';
import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';

import './User.css';
import { currentUserSelector, shownProfileSelector } from '../../store/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import {cn} from '@bem-react/classname';
import { redirectToLogin, removeAuthToken } from '../../utils/cookie';
import { getOwnJobs } from '../../utils/jobsAuthor';
import { getJobs } from '../../api/platform';
import { popularJobsAction } from '../../store/actions/jobs';
const TITLE = 'Профиль';

const cName = cn('profile');

export function Profile() {
    const shownUser = useSelector(shownProfileSelector);
    const authUser = useSelector(currentUserSelector);
 
    const [userRating, setUserRating] = useState(0);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    
    const currentUser = params.search ? shownUser : authUser
    console.log(params, currentUser);
    
    useEffect(() => {
        dispatch<any>(popularJobsAction())
    }, []);

    if (!currentUser) {
        navigate(ROUTES.LOGIN)
        // redirectToLogin();
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

            {params.search &&
                <button>Пригласить в команду</button>
            }
        </div>
    );
}

export default memo(Profile);