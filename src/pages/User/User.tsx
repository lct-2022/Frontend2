import React, { useState, memo, FC, useEffect } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';

import { authUserSelector, currentUserSelector, userRatingSelector } from '../../store/selectors/users';
import { useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';

import {cn} from '@bem-react/classname';
import Button from '../../components/Button';

import './User.css';
import { getRating } from '../../api/rating';
import Spinner from '../../components/Spinner';

const TITLE = 'Профиль';

const cName = cn('profile');

const clientQury = new QueryClient();

export const Profile = () => {
    const currentUser = useSelector(currentUserSelector);
    const authUser = useSelector(authUserSelector);

    const params = useParams();

    const [shownUser, setUser] = useState(authUser);

    useEffect(() => {
        setUser(params.search ? currentUser : authUser)
    }, [params.search])

    const {data, isLoading} = useQuery('getRating', () => getRating('user', shownUser?.id || 0));
    
    if (!shownUser) {
        return null;
    }

    if (isLoading) {
        return <Spinner/>;
    }
    
    return (
        <QueryClientProvider client={clientQury}> 
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
        </QueryClientProvider>
    );
}

export default memo(Profile);