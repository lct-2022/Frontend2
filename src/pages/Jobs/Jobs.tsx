import React, { memo, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getJobs, getProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { Job, Project } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';
import JobCard from '../../components/CommonBlocks/JobItem';

import './Jobs.css';
import { popularJobsAction } from '../../store/actions/jobs';

const cName = cn('jobs-page')

function Jobs() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);

    useEffect(() => {    
        getJobs()
            .then(data => {
                setAllJobs(data.filter(el => el.open));
            })
    }, []);

    const jobsList = useMemo(() => {
        return (
            <div className={cName('list')}>
                {allJobs.map(({title, description, id}) => (
                    <div key={id}>
                        <JobCard
                            title={title}
                            description={description}
                            id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allJobs])

    return (
        <div className={cName()}>
            <h1>Вакансии:</h1>
            
            {jobsList}
        </div>
    )
}
export default memo(Jobs);