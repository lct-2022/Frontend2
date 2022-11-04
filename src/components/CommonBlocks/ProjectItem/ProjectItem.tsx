import React, { memo, useCallback, useState} from 'react';
import { cn } from '@bem-react/classname'
import {useLocation, useParams} from 'react-router-dom'


import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../utils/routes';
import { getCurrentProject, getProjectTeam, getApplications, getTeamsAvailableForProject } from '../../../api/platform';
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
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const canSearchPeople = location.pathname === ROUTES.USER;

    const passToProject = useCallback(() => {
        console.log('qwertyu');
        
        Promise.all([
            dispatch<any>(getCurrentProjectAction(id)),
            // TODO - присылать бы это в ручке списка проектов
            dispatch<any>(getProjectTeamAction(id)),
            // dispatch<any>(getProjectVacanciesAction(id)),
        ])
            .then(() => {
                console.log('qwertyui');
                
                navigate(ROUTES.PROJECT);
            })
            .catch((err) => {
                console.log(err);
                
                throw new Error();
            })
    }, [id]);

    const searchPeople = () => {
        navigate(`${ROUTES.EXPERTS}/1`);
    }

    const passToAppllications = useCallback(() => {
        getApplications(id)
            .then(data => {
                dispatch<any>(getJobApplicationsAction(data))
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

                {canSearchPeople &&
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        <button onClick={searchPeople}>Найти человека в команду</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default memo(ProjectCard);