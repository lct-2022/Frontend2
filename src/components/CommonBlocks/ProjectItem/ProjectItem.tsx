import React, { memo, useCallback, useState} from 'react';
import { cn } from '@bem-react/classname'
import {useLinkClickHandler, useLocation, useParams} from 'react-router-dom';
import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../utils/routes';
import { getApplications } from '../../../api/platform';
import { getCurrentProjectAction, getProjectTeamAction } from '../../../store/actions/projects';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    const canSeeApplications = location.pathname === ROUTES.USER;

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
        navigate(`${ROUTES.EXPERTS}/search`);
    }

    const passToAppllications = useCallback(() => {
        getApplications(id)
            .then(data => {
                dispatch<any>(getJobApplicationsAction(data));
                navigate(ROUTES.APPLICATIONS);
            })
    }, [id]);

    const vote = useCallback(() => {

    }, []);
    
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

                <p style={{fontSize: '10px'}} onClick={vote}>Проголосовать</p>

                {canSearchPeople &&
                    <>
                        <button onClick={searchPeople}>Найти человека в команду</button>

                        <button onClick={searchPeople}>Создать вакансию</button>
                    </>
                }

                {canSeeApplications &&
                    <button onClick={passToAppllications}>Отклики</button>
                }       
            </div>
        </div>
    )
}

export default memo(ProjectCard);