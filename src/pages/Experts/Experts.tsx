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

const cName = cn('experts')

function Experts() {
    const [allExperts, setAllExperts] = useState<User[]>([]);

    useEffect(() => {    
        getProfiles()
            .then(data => {
                setAllExperts(data.result);
            })
    }, []);
    console.log(allExperts)
    
    const expertsList = useMemo(() => {
        return (
            <div className={cName('list')}>
                {allExperts.map(({user: {fio, job, id}, rating}) => (
                    <div key={id}>
                        <ExpertCard
                            fio={fio}
                            job={job}
                            id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allExperts])

    return (
        <div className={cName()}>
            <h1>Эксперты:</h1>

            {expertsList}
        </div>
    )
}
export default memo(Experts);