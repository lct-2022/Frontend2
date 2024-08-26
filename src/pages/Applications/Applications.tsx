
import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import {cn} from '@bem-react/classname';

import { applicationsSelector } from '../../store/selectors/applications';
import Application from '../../ui/CommonBlocks/Application/Application';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

const cName = cn('applications');

function Applications() {
    const applications = useSelector(applicationsSelector);
    
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [])
    
    return (
        <div className={cName()}>
            {applications.map(application => <Application key={application.user_id} application={application}/>)}
            {applications.length === 0 && <h3>Откликов нет</h3>}
              
            <Button onClick={goBack}>Назад к профилю</Button>
        </div>
    )
}

export default Applications;