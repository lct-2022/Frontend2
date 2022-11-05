import React, { memo, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getAllJobs, getJobs, getProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { Job, Project } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';
import JobCard from '../../components/CommonBlocks/JobItem';

import './Jobs.css';
import { popularJobsAction } from '../../store/actions/jobs';
import Spinner from '../../components/Spinner';

const cName = cn('jobs-page');

const queryClient = new QueryClient();

function Jobs() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);

    const {isLoading, error, data} = useQuery('allJobss', () => getAllJobs('*'));

    useEffect(() => {
        setAllJobs(data?.items?.filter(el => el.open) || []);
    }, [data]);

    const jobsList = useMemo(() => {
        return (
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
        )
    }, [allJobs]);

    if (isLoading) {
        return <Spinner/>
    } 

    if (error) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <h1>Вакансии:</h1>
                
                {jobsList}
            </div>
        </QueryClientProvider>
    )
}
export default memo(Jobs);