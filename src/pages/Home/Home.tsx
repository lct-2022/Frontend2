import React, { useEffect, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { useDispatch } from 'react-redux';
import JobsPreview from './components/Jobs';
import ProjectsPreview from './components/Projects';
import TitleHomePage from './components/Title';

import { LIMITS } from '../../utils/consts';
import { getPopularProjects, getPopularJobs, getStats } from '../../api/platform';
import Spinner from '../../components/Spinner';

import './Home.css';

const queryClient = new QueryClient();

function Home() {
    const queryResultProjects = useQuery('popularProjects', () => getPopularProjects((LIMITS.PROJECTS)));
    const queryResultJobs = useQuery('popularJobs', () => getPopularJobs((LIMITS.JOBS)));
    const queryResultStats = useQuery('stats', () => getStats());

    if (queryResultJobs.isLoading || queryResultProjects.isLoading || queryResultStats.isLoading) {
        return <Spinner/>
    }

    if (queryResultJobs.error || queryResultProjects.error || queryResultStats.error
        || !queryResultStats.data || !queryResultProjects.data || !queryResultJobs.data
    ) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <TitleHomePage stats={queryResultStats.data}/>

            <ProjectsPreview projects={queryResultProjects.data}/>
            <JobsPreview jobs={queryResultJobs.data}/>
        </QueryClientProvider>
    )
}

export default Home;