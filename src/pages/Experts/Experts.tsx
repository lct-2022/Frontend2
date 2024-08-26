import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import {useQuery} from 'react-query';

import { cn } from '@bem-react/classname'
import { getProfessions, getSkills } from '../../api/platform';
import { UserData } from '../../types/common';
import ExpertCard from '../../ui/CommonBlocks/ExpertItem';
import { getAllProfiles } from '../../api/passport';

import { useParams } from 'react-router';
import Spinner from '../../ui/Spinner';
import { LIMITS } from '../../utils/consts';
import Button from '../../ui/Button';
import Filtration from './components/Filtration/Filtration';
import { handleError } from '../../utils/handlers';

import './Experts.css';

const cName = cn('experts');

function Experts() {
    const [experts, setExperts] = useState<UserData[]>([]);
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
                setExperts(data?.items || []);
                setPageKey(data?.next_page_key);
                setCriteria('');
                setLoad(false);
            })
    }, [criteria]);

    const showMore = useCallback(() => {
        setLoad(true);
        getAllProfiles(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setExperts(data?.items.map(el => ({...el, hidden: false})) || []);
                setPageKey(data?.next_page_key);
                setLoad(false);
            })
    }, [criteria, pageKey]);

    const allHidden = experts.filter(project => !project.hidden).length === 0;
    const allMiss = !experts.length;

    const allExpertsQuery = useQuery('allExperts', () => getAllProfiles('*', {limit: LIMITS.PROFILES}));

    useEffect(() => {
        setExperts(allExpertsQuery.data?.items?.map(el => ({...el, hidden: false})) || []);
    }, [allExpertsQuery.data]);
    
    const expertsList = useMemo(() => {
        return (
            <div className={cName('list')}>
                {experts.map((user) => (
                    <div key={user.id} className={cName('expert', {hidden: user.hidden})}>
                        <ExpertCard
                            user={user}
                            canBeInvited={params.search}
                        />
                    </div>
                ))}
            </div>
        )
    }, [experts, params.search]);

    const filterProfessions = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setExperts(prev => {
            return prev.map(el => checked && el.profession_id !== Number(value)
                ? {...el, hidden: true} 
                : {...el, hidden: false}   
            );
        });
    }, [setExperts]);

    const filterSkills = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setExperts(prev => {
            return prev.map(el => checked && !el.skill_ids.includes(Number(value))
                ? {...el, hidden: true} 
                : {...el, hidden: false}   
            );
        });
    }, [setExperts]);

    if (allExpertsQuery.isLoading || load) return <Spinner/>

    handleError({experts: allExpertsQuery});

    return (
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
                        filterProfessions={filterProfessions}
                        filterSkills={filterSkills}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Experts);