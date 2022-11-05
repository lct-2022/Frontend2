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

const cName = cn('jobs-page');

const queryClient = new QueryClient();

function Jobs() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);

    const {isLoading, error, data} = useQuery('allJobss', () => getAllJobs('*'));

    useEffect(() => {
        setAllJobs(data?.items?.filter(el => el.open) || []);
    }, [data]);

    if (isLoading) return <h1>Loading</h1>
    if (error) return <h1>error</h1>

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
    }, [allJobs]);

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