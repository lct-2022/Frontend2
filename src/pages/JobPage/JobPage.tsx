import React, { useCallback, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';

import { currentJobSelector } from '../../store/selectors/jobs';
import { applyToJob, cancelApplication } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import { authUserSelector } from '../../store/selectors/users';
import Button from '../../ui/Button';

import './JobPage.css';

const cName = cn('vacancy-page')

const APPLY = 'Откликнуться';
const CANCEL = 'Отозвать';
const APPLICATION_ERROR = 'Не получилось откликнуться на вакансию. Пожалуйста, попробуйте позже';

function JobPage() {
    const currentJob = useSelector(currentJobSelector);
    const authUser = useSelector(authUserSelector);

    const [isApplication, setIsApplication] = useState(false);

    const applicationAction = useCallback(() => {       
        if (!authUserSelector) {
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
                throw new Error(APPLICATION_ERROR);
            });
    }, [currentJob?.id, authUser, isApplication]);

    if (!currentJob) return null;

    const {title, description, id, obligations, requirements, team} = currentJob;    

    return (
        <div className={cName()}>
            <div className={cName('title-block')}>
                <div className={cName('title_info')}>
                    <p className={cName('title')}>{title}</p>
                    <p className={cName('description')}>{description}</p>
                </div>

                <div className={cName('btn-container')}>
                    <Button onClick={applicationAction} className={cName('apply-btn', {applied: isApplication})}>
                        {isApplication ? CANCEL : APPLY}
                    </Button>
                </div>
            </div>

            <div className={cName('project')}>
                {team.project.title}
            </div>

            <div className={cName('requirements-block')}>
                <div>Обязанности:</div>

                <ul className={cName('obligations')}>
                    {obligations.map((obligation, index) => (
                        <li key={obligation}>{obligation}&nbsp;{index + 1}</li>
                    ))}
                </ul>
            </div>

            <div className={cName('requirements-block')}>
                <div>Требования:</div>

                <ul className={cName('requirements')}>
                    {requirements.map((requirement, index) => (
                        <li key={requirement}>{requirement}&nbsp;{index + 1}</li>
                    ))}
                </ul>
            </div>
            
            <div className={cName('team')}>
                {team.title}
            </div>
        </div>
    )
}
export default JobPage;