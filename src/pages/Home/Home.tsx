import React, { useEffect, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { useDispatch } from 'react-redux';
import { popularProjectsAction } from '../../store/actions/projects';
import { popularProfilesAction } from '../../store/actions/users';
import { popularJobsAction } from '../../store/actions/jobs';
import { getTokenFromCookies } from '../../utils/cookie';
import JobsPreview from './components/Jobs';
import ProjectsPreview from './components/Projects';
import TitleHomePage from './components/Title';

import './Home.css';
import { LIMITS } from '../../utils/consts';
import { getPopularProjects, getPopularJobs } from '../../api/platform';
const queryClient = new QueryClient();

function Home() {
    const dispatch = useDispatch();

    const queryResultProjects = useQuery('popularProjects', () => getPopularProjects((LIMITS.PROJECTS)));
    const queryResultJobs = useQuery('popularJobs', () => getPopularJobs((LIMITS.PROJECTS)));

    // TODO: add preloader
    useEffect(() => {
        dispatch<any>(popularProjectsAction(LIMITS.PROJECTS));
        dispatch<any>(popularProfilesAction(LIMITS.PROFILES));
        dispatch<any>(popularJobsAction(LIMITS.JOBS));
    }, []);

    return (
        <div>
            <br />

            <TitleHomePage/>

            <ProjectsPreview projects={queryResultProjects.data || []}/>
            <JobsPreview jobs={queryResultJobs.data || []}/>
        </div>

        // <Navbar/>
    )
}

export default Home;