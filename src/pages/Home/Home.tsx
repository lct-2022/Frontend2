import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import LoginForm from '../Login';
import Profile from '../User';

import './Home.css';
import { getPopularJobs, getPopularProjects } from '../../api/platform';
import { TOKEN } from '../../utils/consts';
import { getPopularProfiles } from '../../api/passport';
import { onLoad } from './preloader';
import { useDispatch } from 'react-redux';
import { popularProjectsAction } from '../../store/actions/projects';
import { popularProfilesAction } from '../../store/actions/users';
import { popularJobsAction } from '../../store/actions/jobs';
import { ProjectsAction, ProjectsActions, SetProjects } from '../../store/types/projects';
import { AnyAction } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';

function Home() {
    // const projects = useSelector(() => {});
    const dispatch = useDispatch();
    const [popularJobs, setPopularJobs] = useState([]);
    const [popularProjects, setPopularProjects] = useState([]);
    const [popularProfiles, setPopularProfiles] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);
    console.log(onLoad());
     
    // TODO: add preloader
    // const getData = async () => {
    //     await getPopularProfiles(TOKEN);
    //     await getPopularJobs(TOKEN);
    //     await getPopularProjects(TOKEN);
    // }

    useEffect(() => {
        dispatch<any>(popularProjectsAction(''));
        dispatch<any>(popularProfilesAction(''));
        dispatch<any>(popularJobsAction(''));
    }, []);

    return (
        <h1>Home</h1>

        // <Navbar/>
    )
}

export default Home;