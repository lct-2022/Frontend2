import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import LoginForm from '../Login';
import Profile from '../User';

import './Home.css';
import { getPopularJobs, getPopularProjects } from '../../api/platform';
import { TOKEN } from '../../utils/consts';
import { getPopularProfiles } from '../../api/passport';
// import { useSelector } from 'react-redux';

function Home() {
    // const projects = useSelector(() => {});
    
    const [popularJobs, setPopularJobs] = useState([]);
    const [popularProjects, setPopularProjects] = useState([]);
    const [popularProfiles, setPopularProfiles] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);

    const getData = async () => {
        await getPopularProfiles(TOKEN);
        await getPopularJobs(TOKEN);
        await getPopularProjects(TOKEN);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <h1>Home</h1>

        // <Navbar/>
    )
}

export default Home;