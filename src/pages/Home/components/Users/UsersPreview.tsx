import React, { memo, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { getPopularJobs, getPopularProjects } from '../../../../api/platform';
// import { useSelector } from 'react-redux';


const UsersPreview = ({...props}) => {
    // const projects = useSelector(() => {});


    return (
        <div>
            {/* {projects.map(() => (

            ))} */}
        </div>
    )
}

export default memo(UsersPreview);