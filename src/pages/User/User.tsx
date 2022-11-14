import React, { useState, useEffect, memo, FC } from 'react';
import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';

import './User.css';
import { authUserSelector, currentUserSelector, userRatingSelector } from '../../store/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import {cn} from '@bem-react/classname';
import { UserData } from '../../types';
import Button from '../../components/Button';

const TITLE = 'Профиль';

const cName = cn('profile');

export const Profile = () => {
    const currentUser = useSelector(currentUserSelector);
    const authUser = useSelector(authUserSelector);
    const rating = useSelector(userRatingSelector);

    const params = useParams()

    const [shownUser] = useState(params.search ? currentUser : authUser);

    if (!shownUser) {
        return null;
    }
    
    return (
        <div className={cName()}>
            <h1>{TITLE}</h1>

            <Bio 
                user={shownUser}
                {...params.search && {rating}}
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