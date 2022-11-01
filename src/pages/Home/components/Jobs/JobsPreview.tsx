import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './JobsPreview.css';

import { popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';
import JobCard from '../JobItem/JobItem';

const TITLE = 'Cрочные вакансии';

const JobsPreview = () => {
    const jobs = useSelector(popularJobsSelector);

    const jobsList = useMemo(() => {
        return (
            <div className="vacancies-preview">
                {jobs.map(({title, description, id}, index) => (
                    <div key={index}>
                        <JobCard
                            title={title}
                            description={description}
                            id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [jobs]);
    
    return (
        <div>
            <h3>{TITLE}</h3>

            {jobsList}
        </div>
    )
}

export default memo(JobsPreview);