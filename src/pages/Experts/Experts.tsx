import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getPopularJobs, getPopularProjects, getProfessions, getSkills } from '../../api/platform';
import { UserData } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';
import ExpertCard from '../../components/CommonBlocks/ExpertItem';
import { getAllProfiles, getProfiles } from '../../api/passport';

import './Experts.css';
import { useParams } from 'react-router';
import Spinner from '../../components/Spinner';
import { LIMITS } from '../../utils/consts';
import Button from '../../components/Button';
import Filtration from './components/Filtration/Filtration';

const cName = cn('experts');
const queryClient = new QueryClient();


function Experts() {
    const [allExperts, setAllExperts] = useState<UserData[]>([]);
    const params = useParams();

    const [criteria, setCriteria] = useState('');
    const [pageKey, setPageKey] = useState<string | undefined>();

    const changeCriteria = (event: ChangeEvent<HTMLInputElement>) => {
        setCriteria(event.target.value);
    };

    const search = useCallback(() => {
        getAllProfiles(criteria || '*', {limit: LIMITS.PROFILES, pageKey})
            .then(data => {
                setAllExperts(data?.items || []);
                setPageKey(data?.next_page_key);
                setCriteria('');

            })
    }, [criteria]);

    const showMore = useCallback(() => {
        getAllProfiles(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setAllExperts(data?.items.map(el => ({...el, hidden: false})) || []);
                setPageKey(data?.next_page_key);
            })
    }, [criteria, pageKey]);

    const allHidden = allExperts.filter(project => !project.hidden).length === 0;
    const allMiss = !allExperts.length;

    const {isLoading, error, data} = useQuery('allExperts', () => getAllProfiles('*', {limit: LIMITS.PROFILES}));
    const professions = useQuery('professions', () => getProfessions());
    const skills = useQuery('skills', () => getSkills());

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

    if (isLoading || professions.isLoading || skills.isLoading) {
        return <Spinner/>
    } 

    if (error || professions.error || skills.error) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <div className={cName('options')}>
                    <div className={cName('list')}>
                        <div>
                            <div className={cName('search')}>
                            <input type="text" value={criteria} placeholder="Найти проект" onChange={changeCriteria} className={cName('search-input')}/>

                                <Button onClick={search}>
                                    {allHidden || allMiss ? 'Показать все' : 'Найти'}
                                </Button>
                            </div>

                            {expertsList}
                        </div>
                    </div>

                    <div className={cName('filtration')}>
                        <Filtration
                            experts={allExperts}
                            setExperts={setAllExperts}
                            professions={professions.data || []}
                            skills={skills.data || []}
                        />
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}
export default memo(Experts);