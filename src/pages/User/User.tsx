import React, { useState, memo, FC } from 'react';
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

const TITLE = 'Профиль';

const cName = cn('profile');

const clientQury = new QueryClient();

export const Profile = () => {
    const currentUser = useSelector(currentUserSelector);
    const authUser = useSelector(authUserSelector);
    const rating = useSelector(userRatingSelector);

    const params = useParams();

    const [shownUser] = useState(params.search ? currentUser : authUser);

    // const {data, isLoading} = useQuery('getRating', () => getRating('user', shownUser?.id || 0));
    // console.log(data);
    
    if (!shownUser) {
        return null;
    }
    
    return (
        <QueryClientProvider client={clientQury}> 
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
        </QueryClientProvider>
    );
}

export default memo(Profile);