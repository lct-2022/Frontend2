import React, { useCallback } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './ProjectPage.css';
import { currentUserSelector } from '../../store/selectors/users';
import { availableTeamsAction } from '../../store/actions/teams';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const cName = cn('project-page')

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);
    const currentUser = useSelector(currentUserSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const canSearchReam = currentUser?.admin && currentProject?.project['author-id'] === currentUser?.id;
    
    const {project, team, openVacancies, rating} = currentProject ?? {}
    const {title, description, url, contests} = project ?? {}
    const createdAt = project?.['created-at'] ?? '';

    const getTeamsForProject = useCallback(() => {
        dispatch<any>(availableTeamsAction(currentProject?.project?.id ?? 0, getTokenFromCookies()))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [currentProject]);
    
    if (!currentProject) {
        return null;
    }

    return (
        <div className={cName()}>
            <div className={cName('title-card')}>
                <div className={cName('logo')}/>
                <p className={cName('title')}>{title}</p>
            </div>

            <div className={cName('details')}>
                <div className={cName('description-card')}>
                    <div className={cName('team-info')}>
                        <p className={cName('team-amount')}>{team?.length} человек в команде</p>
                        
                        <p>{openVacancies?.length ? `${openVacancies?.length} открытых вакансий` : 'Открытых вакансий нет'}</p>
                    </div>

                    <p className={cName('description')}>{description}</p>

                    <a 
                        href={url || 'https://ya.ru/'}
                        target="_blank"
                        rel="noopener norefere"
                    >
                        {url || 'https://ya.ru/'}  
                    </a>

                    <p className={cName('contests')}>{contests}</p>

                    <p className={cName('created')}>{createdAt}</p>

                    <div>Rate:&nbsp;{rating}</div>
                </div>

                <div className={cName('vacancies')}>
                    <p>Вакансии</p>

                    <div>
                        <ul>
                            <li>Front</li>
                            <li>Back</li>
                            <li>PM</li>
                            <li>Designer</li>
                        </ul>
                    </div>
                </div>
            </div>

            {canSearchReam && 
                <button onClick={getTeamsForProject}>Добавить команду</button>
            }
        </div>
    )
}
export default ProjectPage;