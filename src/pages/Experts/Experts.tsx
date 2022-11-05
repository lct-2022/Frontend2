import React, { memo, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getJobs, getProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { UserData } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';
import ExpertCard from '../../components/CommonBlocks/ExpertItem';
import { getAllProfiles, getProfiles } from '../../api/passport';

import './Experts.css';
import { useParams } from 'react-router';

const cName = cn('experts');
const queryClient = new QueryClient();


function Experts() {
    const [allExperts, setAllExperts] = useState<UserData[]>([]);
    const params = useParams();

    const {isLoading, error, data} = useQuery('allExperts', () => getAllProfiles('*'));

    useEffect(() => {
        setAllExperts(data?.items?.map(el => ({...el, hidden: false})) || []);
    }, [data]);

    if (isLoading) return <h1>Loading</h1>
    if (error) return <h1>error</h1>
    
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
    }, [allExperts, params.search])

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