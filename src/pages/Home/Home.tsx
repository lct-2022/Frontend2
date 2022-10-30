import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import LoginForm from '../Login';
import Profile from '../User';

import './Home.css';
import { getPopularJobs, getPopularProjects } from '../../api/platform';
import { LIMITS, TOKEN } from '../../utils/consts';
import { getPopularProfiles } from '../../api/passport';
import { onLoad } from './preloader';
import { useDispatch } from 'react-redux';
import { popularProjectsAction } from '../../store/actions/projects';
import { popularProfilesAction } from '../../store/actions/users';
import { popularJobsAction } from '../../store/actions/jobs';
import { ProjectsAction, ProjectsActions, SetProjects } from '../../store/types/projects';
import { AnyAction } from '@reduxjs/toolkit';
import { popularProjectsSelector } from '../../store/selectors/projects';
import { getTokenFromCookies } from '../../utils/cookie';
// import { useSelector } from 'react-redux';
import JobsPreview from './components/Jobs'

function Home() {
    const dispatch = useDispatch();
    //  console.log(store);
     
    // TODO: add preloader
    useEffect(() => {
        dispatch<any>(popularProjectsAction(getTokenFromCookies()));
        dispatch<any>(popularProfilesAction(getTokenFromCookies()));
        dispatch<any>(popularJobsAction(getTokenFromCookies(), LIMITS.JOBS));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            
            <br />

            <JobsPreview/>
        </div>

        // <Navbar/>
    )
}

export default Home;