import React, { memo, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import { getPopularProfiles, getPopularJobs, getPopularProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';

// import { useSelector } from 'react-redux';


const EventsList = ({...props}) => {
    const events = [];
    // useSelector(() => {});

    const [popularJobs, setPopularJobs] = useState([]);
    const [popularProjects, setPopularProjects] = useState([]);
    const [popularProfiles, setPopularProfiles] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);

    return (
        <div>
            {/* {projects.map(() => (

            ))} */}
        </div>
    )
}

export default memo(EventsList);