import React, { memo, useEffect, useMemo, useState } from 'react';
 
import { popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';
import JobCard from '../../../../components/CommonBlocks/JobItem';
import {Props} from './types'

import './JobsPreview.css';

const TITLE = 'Cрочные вакансии';

const JobsPreview: Props = ({jobs}) => {
    const jobsList = useMemo(() => {
        return (
            <div className="vacancies-preview">
                {jobs?.map(({title, description, job_application, id}, index) => (
                    <div key={index}>
                        <JobCard
                            title={title}
                            description={description}
                            application={job_application}
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