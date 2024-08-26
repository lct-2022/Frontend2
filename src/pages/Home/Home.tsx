import React from 'react';
import { useQuery} from 'react-query';

import JobsPreview from './components/Jobs';
import ProjectsPreview from './components/Projects';
import TitleHomePage from './components/Title';
import { LIMITS } from '../../utils/consts';
import { getPopularProjects, getPopularJobs, getStats } from '../../api/platform';
import Spinner from '../../ui/Spinner';
import { handleError } from '../../utils/handlers';

import './Home.css';

function Home() {
    const queryResultProjects = useQuery('popularProjects', () => getPopularProjects((LIMITS.PROJECTS)));
    const queryResultJobs = useQuery('popularJobs', () => getPopularJobs((LIMITS.JOBS)));
    const queryResultStats = useQuery('stats', () => getStats());

    if (queryResultJobs.isLoading || queryResultProjects.isLoading || queryResultStats.isLoading) {
        return <Spinner/>
    }

    handleError({
        projects: queryResultProjects,
        jobs: queryResultJobs,
        stats: queryResultStats,
    });

    if (!queryResultProjects.data || !queryResultJobs.data || !queryResultStats.data) {
        throw new Error('No data');
    }

    return (
        <>
            <TitleHomePage stats={queryResultStats.data}/>
            <ProjectsPreview projects={queryResultProjects.data}/>
            <JobsPreview jobs={queryResultJobs.data}/>
        </>
    )
}

export default Home;