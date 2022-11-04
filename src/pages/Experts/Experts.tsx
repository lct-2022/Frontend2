import React, { memo, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getJobs, getProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { Job, Project, User } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';
import ExpertCard from '../../components/CommonBlocks/ExpertItem';
import { getProfiles } from '../../api/passport';

import './Experts.css';
import { useParams } from 'react-router';

const cName = cn('experts')

function Experts() {
    const [allExperts, setAllExperts] = useState<User[]>([]);
    const params = useParams();

    useEffect(() => {    
        getProfiles()
            .then(data => {
                setAllExperts(data.map(el => ({...el, hidden: false})));
            })
    }, []);
    
    const expertsList = useMemo(() => {
        return (
            <div className={cName('list')}>
                {allExperts.map(({user, rating}) => (
                    <div key={user.id}>
                        <ExpertCard
                            user={user}
                            rating={rating}
                            canBeInvited={params.search}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allExperts, params.search])

    return (
        <div className={cName()}>
            <h1>Эксперты:</h1>

            {expertsList}
        </div>
    )
}
export default memo(Experts);