import React, { useCallback, useMemo } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './JobPage.css';
import { currentJobSelector } from '../../store/selectors/jobs';
import { applyToJob } from '../../api/platform';
import { getTokenFromCookies, redirectToLogin } from '../../utils/cookie';
import { currentUserSelector } from '../../store/selectors/users';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const cName = cn('job-page')

const APPLY = 'Откликнуться';

function JobPage() {
    const currentJob = useSelector(currentJobSelector);
    const currentUser = useSelector(currentUserSelector)

    const navigate = useNavigate();

    // TODO: remove possibilities of NULL in currentJob
    const makeApply = useCallback(() => {
        if (!currentUser) {
            redirectToLogin();
            return;
        }
        console.log('here');
        
        applyToJob(currentJob?.id ?? 0, getTokenFromCookies())
            .then(() => {
                navigate(ROUTES.APPLICATIONS);
            })
            .catch(() => {
                throw new Error();
            })
    }, [currentJob?.id, currentUser]);

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
    const teamId = currentJob['team_id']
    const createdAt = currentJob['created_at'];
    
    // const currentJobProject = team.project

    return (
        <div className={cName()}>
            <div className={cName('title-block')}>
                <div className={cName('vacancy-title_info')}>
                    <p className={cName('vacancy-title')}>{title}</p>
                    <p className={cName('vacancy-description')}>{description}</p>
                </div>

                <div className={cName('btn-container')}>
                    <button onClick={makeApply}>{APPLY}</button>
                </div>
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