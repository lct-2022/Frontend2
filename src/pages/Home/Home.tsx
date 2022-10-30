import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { popularProjectsAction } from '../../store/actions/projects';
import { popularProfilesAction } from '../../store/actions/users';
import { popularJobsAction } from '../../store/actions/jobs';
import { getTokenFromCookies } from '../../utils/cookie';
import JobsPreview from './components/Jobs';
import ProjectsPreview from './components/Jobs';
import TitleHomePage from './components/Title';

import './Home.css';

function Home() {
    const dispatch = useDispatch();
    //  console.log(store);
     
    // TODO: add preloader
    useEffect(() => {
        dispatch<any>(popularProjectsAction(getTokenFromCookies()));
        dispatch<any>(popularProfilesAction(getTokenFromCookies()));
        dispatch<any>(popularJobsAction(getTokenFromCookies()));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            
            <br />

            <TitleHomePage/>
            <ProjectsPreview/>
            <JobsPreview/>
        </div>

        // <Navbar/>
    )
}

export default Home;