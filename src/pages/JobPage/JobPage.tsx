import React, { useCallback } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './JobPage.css';
import { currentJobSelector } from '../../store/selectors/jobs';
import { applyToJob } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';

const cName = cn('job-page')

const APPLY = 'Откликнуться';

function JobPage() {
    const currentJob = useSelector(currentJobSelector);

    const makeApply = useCallback(() => {
        applyToJob(currentJob?.id ?? 0, getTokenFromCookies());
    }, [currentJob?.id]);

    if (!currentJob) return null;

    const {title, description, team, id} = currentJob;
    const teamId = currentJob['team-id']
    const createdAt = currentJob['created-at'];

    return (
        <div className={cName()}>
            <div className={cName('title')}>
                <p>{title}</p>


                <button onClick={makeApply}>{APPLY}</button>
            </div>
            
            <div>Требования</div>

            <div className={cName('team')}>

            </div>
        </div>
    )
}
export default JobPage;