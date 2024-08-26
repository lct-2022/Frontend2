import React, { memo, useEffect, useState } from 'react';
import {useQuery} from 'react-query';

import { cn } from '@bem-react/classname'
import { getAllJobs } from '../../api/platform';
import { Job } from '../../types/common';
import JobCard from '../../ui/CommonBlocks/JobItem';
import Spinner from '../../ui/Spinner';
import { LIMITS } from '../../utils/consts';

import './Jobs.css';

const cName = cn('jobs-page');

function Jobs() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
        
    const {isLoading, error, data} = useQuery('allJobs', () => getAllJobs('*', {limit: LIMITS.JOBS}));

    useEffect(() => {
        setAllJobs(data?.items?.filter(el => el.open) || []);
    }, [data]);

    if (isLoading) {
        return <Spinner/>
    } 

    if (error) {
        throw new Error('Не получилось получить вакансии');
    }

    return (
        <div className={cName()}>
            <h1>Вакансии:</h1>
                
            <div className={cName('list')}>
                {allJobs.map(({title, description, job_application, id}) => (
                    <div key={id}>
                        <JobCard
                            title={title}
                            description={description}
                            application={job_application} 
                            id={id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Jobs);