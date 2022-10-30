import React, { memo, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import './JobsPreview.css';
import { getPopularJobs, getPopularProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
import { popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';
import { TITLE } from './consts';
import { popularProjectsSelector } from '../../../../store/selectors/projects';

// import { useSelector } from 'react-redux';



const TitleHomePage = () => {
    const jobs = useSelector(popularJobsSelector);
    const projects = useSelector(popularProjectsSelector);
    
    return (
        <div>
            <h3>{TITLE}</h3>

            {jobs.map((item, index) => (
                <div key={index} className="vacancy_card">
                    {item.title}

                    <hr/>

                    {item.description}
                    
                </div>
            ))}
        </div>
    )
}

export default memo(TitleHomePage);