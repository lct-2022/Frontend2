
import React, { memo, useCallback, useEffect, useState } from 'react';

import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { applicationsSelector } from '../../store/selectors/applications';
import Application from '../../components/CommonBlocks/Application/Application';
import { getPopularJobs } from '../../api/platform';
import { getOwnJobs } from '../../utils/jobsAuthor';
import { authUserSelector } from '../../store/selectors/users';
import { ApplicationStatus, Job } from '../../types';
import { useNavigate } from 'react-router-dom';
const cName = cn('applications');

const APPLICATIONS = [
    {
        user_id: 7,
        message: 'Отклик',
        status: ApplicationStatus.ACCEPTED,
        job: {
            title: 'Fresh',
        }
    },
    {
        user_id: 6,
        message: 'Отклик',
        status: ApplicationStatus.ACCEPTED,
        job: {
            title: 'Argument',
        }
    }
]

function Applications() {
    const applications = APPLICATIONS
    // useSelector(applicationsSelector);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    
    return (
        <div className={cName()}>
            {/* <h3></h3> */}

            {applications.map(application => <Application key={application.user_id} application={application}/>)}
            
            
            <button onClick={goBack}>Назад к профилю</button>
        </div>
    )
}

export default Applications;