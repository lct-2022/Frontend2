import React, { memo, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { getJobs, getProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
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