import React, { memo } from 'react';
 
import JobCard from '../../../../ui/CommonBlocks/JobItem';
import {Props} from './types'

import './JobsPreview.css';

const TITLE = 'Cрочные вакансии';

const JobsPreview: Props = ({jobs}) => {
    return (
        <div>
            <h3>{TITLE}</h3>

            <div className="vacancies-preview">
                {jobs?.map(({title, description, job_application, id}) => (
                    <JobCard
                        title={title}
                        description={description}
                        application={job_application}
                        id={id}
                        key={id}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(JobsPreview);