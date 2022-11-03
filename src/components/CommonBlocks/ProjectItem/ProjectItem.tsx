import React, { memo, useCallback, useState} from 'react';
import { cn } from '@bem-react/classname'
import {useLocation} from 'react-router-dom'


import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../utils/routes';
import { getCurrentProject, getProjectTeam, getProjectVacancies, getTeamsAvailableForProject } from '../../../api/platform';
import { getCurrentProjectAction, getProjectTeamAction, getProjectVacanciesAction } from '../../../store/actions/projects';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTokenFromCookies } from '../../../utils/cookie';
import { availableTeamsAction } from '../../../store/actions/teams';
import { currentUserSelector } from '../../../store/selectors/users';
import { TeamCreate } from '../../../pages/User/components/Teams/Teams';
import { getJobApplicationsAction } from '../../../store/actions/jobs';

const cName = cn('project-card');

const TITLE_RATE = 'Рейтинг';

const ProjectCard: Props = ({
    title, 
    description,
    contest,
    url,
    rating,
    id,
    author_id,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = useSelector(currentUserSelector)

    const isFromProfile = location.pathname === ROUTES.USER;
    const canSearchTeam = isFromProfile && (currentUser?.admin || currentUser?.id === author_id);

    const passToProject = useCallback(() => {
        Promise.all([
            dispatch<any>(getCurrentProjectAction(id)),
            // TODO - присылать бы это в ручке списка проектов
            dispatch<any>(getProjectTeamAction(id)),
            dispatch<any>(getProjectVacanciesAction(id)),
        ])
            .then(() => {
                navigate(ROUTES.PROJECT);
            })
            .catch(() => {
                throw new Error();
            })
    }, [id]);

    const getTeamsForProject = useCallback(() => {
        dispatch<any>(availableTeamsAction(id, getTokenFromCookies()))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [id]);

    const passToAppllications = useCallback(() => {
        getProjectVacancies(id)
            .then(data => {
                dispatch<any>(getJobApplicationsAction(data.result))
            })
    }, [id]);
    
    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <p className={cName('text', {title: true})} onClick={passToProject}>
                        {title}
                    </p>

                    <p className={cName('text', {description: true})}>
                        {description}
                    </p>

                </div>

                <div className={cName('details')}>
                    <span>{contest}</span>
                    <span>{url}</span>
                </div>
            </div>

            <div className={cName('rating')}>
                <p>{TITLE_RATE}:&nbsp;</p>

                <b>{rating}</b>

                {canSearchTeam &&
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        <button onClick={getTeamsForProject}>Найти команду для проекта</button>
                        <button onClick={passToAppllications}>Отклики</button>
                    </div>

                }
            </div>
        </div>
    )
}

export default memo(ProjectCard);