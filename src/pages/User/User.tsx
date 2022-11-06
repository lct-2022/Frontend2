import React, { useState, ChangeEvent, useCallback, useEffect, useMemo, memo, FC } from 'react';
import UserOptions from './components/Options';
import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';

import './User.css';
import { authUserSelector, currentUserSelector } from '../../store/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import {cn} from '@bem-react/classname';
import { getTokenFromCookies, removeAuthToken } from '../../utils/cookie';
import { getOwnJobs } from '../../utils/jobsAuthor';
import { getPopularJobs } from '../../api/platform';
import { popularJobsAction } from '../../store/actions/jobs';
import { UserData } from '../../types';
import { getAuthorizedUserAction } from '../../store/actions/users';
import { getAuthorizedUser } from '../../api/passport';
import Button from '../../components/Button';
const TITLE = 'Профиль';

const cName = cn('profile');

interface Props {
    user?: UserData;
}

export const Profile: FC<Props> = () => {
    const currentUser = useSelector(currentUserSelector);
    const authUser = useSelector(authUserSelector);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams()

    const [shownUser, setShownUser] = useState(authUser);
    
    useEffect(() => {
        setShownUser(params.search ? currentUser : authUser);
    }, [params.search, currentUser, authUser]);

    useEffect(() => {
        dispatch<any>(popularJobsAction())
    }, []);

    if (!shownUser) {
        navigate(ROUTES.LOGIN)
        return null;
    }
    
    return (
        <div className={cName()}>
            <h1>{TITLE}</h1>

            <Bio 
                user={shownUser}
                rating={1}
            />

            <div className={cName('down')}>
                <UserRoutes user={shownUser}/>
                <Contacts user={shownUser}/>
            </div>

            {params.search &&
                <Button>Пригласить в команду</Button>
            }
        </div>
    );
}

export default memo(Profile);