import React, { memo, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { getPopularProfiles, getPopularJobs, getPopularProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
// import { useSelector } from 'react-redux';


const UsersList = ({...props}) => {
    // const projects = useSelector(() => {});

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

export default memo(UsersList);