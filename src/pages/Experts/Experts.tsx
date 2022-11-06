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
    const [load, setLoad] = useState(false)

    const changeCriteria = (event: ChangeEvent<HTMLInputElement>) => {
        setCriteria(event.target.value);
    };

    const search = useCallback(() => {
        setLoad(true);
        getAllProfiles(criteria || '*', {limit: LIMITS.PROFILES, pageKey})
            .then(data => {
                setAllExperts(data?.items || []);
                setPageKey(data?.next_page_key);
                setCriteria('');
                setLoad(false);
            })
    }, [criteria]);

    const showMore = useCallback(() => {
        setLoad(true);
        getAllProfiles(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setAllExperts(data?.items.map(el => ({...el, hidden: false})) || []);
                setPageKey(data?.next_page_key);
                setLoad(false);
            })
    }, [criteria, pageKey]);

    const allHidden = allExperts.filter(project => !project.hidden).length === 0;
    const allMiss = !allExperts.length;

    const allExpertsQuery = useQuery('allExperts', () => getAllProfiles('*', {limit: LIMITS.PROFILES}));
    const professions = useQuery('professions', () => getProfessions());
    const skills = useQuery('skills', () => getSkills());

    useEffect(() => {
        setAllExperts(allExpertsQuery.data?.items?.map(el => ({...el, hidden: false})) || []);
    }, [allExpertsQuery.data]);
    
    const expertsList = useMemo(() => {
        return (
            <div className={cName('list')}>
                {allExperts.map((user) => (
                    <div key={user.id} className={cName('expert', {hidden: user.hidden})}>
                        <ExpertCard
                            user={user}
                            canBeInvited={params.search}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allExperts, params.search]);

    if (allExpertsQuery.isLoading || professions.isLoading || skills.isLoading || load) {
        return <Spinner/>
    } 

    if (allExpertsQuery.error || professions.error || skills.error) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <div className={cName('options')}>
                    <div className={cName('list')}>
                        <div>
                            <div className={cName('search')}>
                            <input type="text" value={criteria} placeholder="Найти эксперта" onChange={changeCriteria} className={cName('search-input')}/>

                                <Button onClick={search}>
                                    {allHidden || allMiss ? 'Показать все' : 'Найти'}
                                </Button>
                            </div>

                            {expertsList}

                            {!allHidden && !allMiss &&
                                <Button className={cName('show-more-btn')} onClick={showMore}>
                                    Показать еще 
                                </Button>  
                            } 
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