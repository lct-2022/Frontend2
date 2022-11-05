import React, { memo, useCallback, useState} from 'react';
import { cn } from '@bem-react/classname'
import {useLinkClickHandler, useLocation, useParams} from 'react-router-dom';
import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../utils/routes';
import { getApplications, getCurrentProject } from '../../../api/platform';
import { getCurrentProjectAction, getProjectTeamAction } from '../../../store/actions/projects';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getJobApplicationsAction } from '../../../store/actions/jobs';
import { vote } from '../../../api/rating';
import { getTokenFromCookies } from '../../../utils/cookie';
import { currentUserSelector } from '../../../store/selectors/users';

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

    const currentUser = useSelector(currentUserSelector);

    const passToProject = useCallback(() => {
        Promise.all([
            new Promise((res) => res(dispatch<any>(getCurrentProjectAction(id)))),
            new Promise((res) => res(dispatch<any>(getProjectTeamAction(id)))),
            // dispatch<any>(getProjectVacanciesAction(id)),
        ])
            .then(() => {
                navigate(ROUTES.PROJECT);
            })
            .catch((err) => {
                throw new Error(err);
            });
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

    const makeVote = useCallback(() => {
        if (!currentUser) { 
            return;
        }
        vote({
            method: 'vote',
            subjectType: 'project',
            subjectId: id,
            token: getTokenFromCookies()
        })
            .then(() => {
                getCurrentProject(id);
            })
    }, [id, currentUser]);
    
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
                {rating !== undefined && 
                    <>
                        <p>{TITLE_RATE}:&nbsp;</p>
        
                        <b>{rating}</b>
                    </>
                }

                <p style={{fontSize: '10px', cursor: 'pointer'}} onClick={makeVote}>Проголосовать</p>

                {canSearchPeople &&
                    <button onClick={searchPeople}>Найти человека в команду</button>
                }

                {currentUser?.admin &&
                    <button>Создать вакансию</button>
                }           

                {/* {canSeeApplications &&
                    <button onClick={passToAppllications}>Отклики</button>
                }        */}
            </div>
        </div>
    )
}

export default memo(ProjectCard);