
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
import Button from '../../components/Button';
const cName = cn('applications');

function Applications() {
    const applications = useSelector(applicationsSelector);
    console.log('Applications');
    
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    
    return (
        <div className={cName()}>
            {applications.map(application => <Application key={application.user_id} application={application}/>)}
            {applications.length === 0 && <h3>Откликов нет</h3>}
              
            <Button onClick={goBack}>Назад к профилю</Button>
        </div>
    )
}

export default Applications;