import React, { useCallback, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './JobPage.css';
import { currentJobSelector } from '../../store/selectors/jobs';
import { applyToJob, cancelApplication } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import { authUserSelector } from '../../store/selectors/users';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const cName = cn('vacancy-page')

const APPLY = 'Откликнуться';
const CANCEL = 'Отозвать';

function JobPage() {
    const currentJob = useSelector(currentJobSelector);
    const authUser = useSelector(authUserSelector);

    const [isApplication, setIsApplication] = useState(false);

    const navigate = useNavigate();

    // TODO: remove possibilities of NULL in currentJob
    const applicationAction = useCallback(() => {       
        if (!authUserSelector || !currentJob) {
            alert('Чтобы откликнуться на вакансию, войдите или зарегистируйтесь')
            return;
        }

        const applicationRequestor = !isApplication
            ? applyToJob
            : cancelApplication;
        
        applicationRequestor(id, getTokenFromCookies())
            .then(result => {
                setIsApplication(!!result)
            })
            .catch(() => {
                throw new Error()
            });
    }, [currentJob?.id, authUser, isApplication]);

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

    const {title, description, team, team_id, id} = currentJob;    
    // const currentJobProject = team.project

    return (
        <div className={cName()}>
            <div className={cName('title-block')}>
                <div className={cName('title_info')}>
                    <p className={cName('title')}>{title}</p>
                    <p className={cName('description')}>{description}</p>
                </div>

                <div className={cName('btn-container')}>
                    <button onClick={applicationAction} className={cName('apply-btn', {applied: isApplication})}>
                        {isApplication ? CANCEL : APPLY}
                    </button>
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