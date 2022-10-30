import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './JobsPreview.css';
import { popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';

const TITLE = 'Cрочные вакансии';

const JobsPreview = () => {
    const jobs = useSelector(popularJobsSelector);

    const jobsLost = useMemo(() => {
        return (
            <div className="vacancies-preview">
                {jobs.map((item, index) => (
                    <div></div>
                ))}
            </div>
        )
    }, [jobs])
    
    return (
        <div>
            <h3>{TITLE}</h3>

            {jobsLost}
        </div>
    )
}

export default memo(JobsPreview);