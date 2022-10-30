import React, { memo, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import './JobsPreview.css';
import { getPopularJobs, getPopularProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
import { popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';

// import { useSelector } from 'react-redux';


const JobsPreview = () => {
    const jobs = useSelector(popularJobsSelector);
    console.log('==>', useSelector(store => store));
    
    return (
        <div>
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

export default memo(JobsPreview);