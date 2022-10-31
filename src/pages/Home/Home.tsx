import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { popularProjectsAction } from '../../store/actions/projects';
import { popularProfilesAction } from '../../store/actions/users';
import { popularJobsAction } from '../../store/actions/jobs';
import { getTokenFromCookies } from '../../utils/cookie';
import JobsPreview from './components/Jobs';
import ProjectsPreview from './components/Projects';
import TitleHomePage from './components/Title';

import './Home.css';

function Home() {
    const dispatch = useDispatch();
     
    // TODO: add preloader
    useEffect(() => {
        dispatch<any>(popularProjectsAction(getTokenFromCookies()));
        dispatch<any>(popularProfilesAction(getTokenFromCookies()));
        dispatch<any>(popularJobsAction(getTokenFromCookies()));
    }, []);

    return (
        <div>
            <br />

            <TitleHomePage/>

            <ProjectsPreview/>
            <JobsPreview/>
        </div>

        // <Navbar/>
    )
}

export default Home;