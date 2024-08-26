import React, { useState, memo, useEffect } from 'react';
import { useQuery} from 'react-query';
import { useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';

import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';
import { authUserSelector, currentUserSelector } from '../../store/selectors/users';
import {cn} from '@bem-react/classname';
import Button from '../../ui/Button';
import { getRating } from '../../api/rating';
import Spinner from '../../ui/Spinner';

import './User.css';

const TITLE = 'Профиль';

const cName = cn('profile');

export const Profile = () => {
    const currentUser = useSelector(currentUserSelector);
    const authUser = useSelector(authUserSelector);

    const params = useParams();

    const [shownUser, setUser] = useState(authUser);

    useEffect(() => {
        setUser(params.search ? currentUser : authUser)
    }, [params.search])

    const {data, isLoading, error} = useQuery('getRating', () => getRating('user', shownUser?.id || 0));

    if (error) throw new Error('Failed get rating');
    
    if (!shownUser) return null;

    if (isLoading) return <Spinner/>;
    
    return (
        <div className={cName()}>
            <h1>{TITLE}</h1>

            <Bio 
                user={shownUser}
                {...params.search && {rating: data}}
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