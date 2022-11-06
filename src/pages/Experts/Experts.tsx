import React, { memo, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getPopularJobs, getPopularProjects } from '../../api/platform';
import { UserData } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';
import ExpertCard from '../../components/CommonBlocks/ExpertItem';
import { getAllProfiles, getProfiles } from '../../api/passport';

import './Experts.css';
import { useParams } from 'react-router';
import Spinner from '../../components/Spinner';
import { LIMITS } from '../../utils/consts';

const cName = cn('experts');
const queryClient = new QueryClient();


function Experts() {
    const [allExperts, setAllExperts] = useState<UserData[]>([]);
    const params = useParams();

    const {isLoading, error, data} = useQuery('allExperts', () => getAllProfiles('*', {limit: LIMITS.PROFILES}));

    useEffect(() => {
        setAllExperts(data?.items?.map(el => ({...el, hidden: false})) || []);
    }, [data]);
    
    const expertsList = useMemo(() => {
        return (
            <div className={cName('list')}>
                {allExperts.map((user) => (
                    <div key={user.id}>
                        <ExpertCard
                            user={user}
                            canBeInvited={params.search}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allExperts, params.search]);

    if (isLoading) {
        return <Spinner/>
    } 

    if (error) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <h1>Эксперты:</h1>

                {expertsList}
            </div>
        </QueryClientProvider>
    )
}
export default memo(Experts);