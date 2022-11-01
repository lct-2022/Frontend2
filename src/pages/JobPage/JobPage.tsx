import React, { useCallback, useMemo } from 'react';
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

    const obligations = useMemo(() => {
        return (
            <ul className={cName('requirements')}>
                {new Array(5).fill('Обязанность').map((el, index) => (
                    <li key={index}>{el}&nbsp;{index + 1}</li>
                ))}
            </ul>
        )
    }, []);

    const requirements = useMemo(() => {
        return (
            <ul className={cName('requirements')}>
                {new Array(10).fill('Требование').map((el, index) => (
                    <li key={index}>{el}&nbsp;{index + 1}</li>
                ))}
            </ul>
        )
    }, []);

    if (!currentJob) return null;

    const {title, description, team, id} = currentJob;
    const teamId = currentJob['team-id']
    const createdAt = currentJob['created-at'];

    return (
        <div className={cName()}>
            <div className={cName('title-block')}>
                <p className={cName('vacancy-title')}>{title}</p>

                <button onClick={makeApply}>{APPLY}</button>
            </div>

            <div className={cName('project')}>
                
            </div>

            <div className={cName('requirements-block')}>
                <div>Обязанности:</div>
                {obligations}
            </div>

            <div className={cName('requirements-block')}>
                <div>Требования:</div>
                {requirements}
            </div>
            
            <div className={cName('team')}>

            </div>
        </div>
    )
}
export default JobPage;