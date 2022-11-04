import React, { useCallback } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './ProjectPage.css';
import { currentUserSelector } from '../../store/selectors/users';
import { availableTeamsAction } from '../../store/actions/teams';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Button from '../../components/Button'

const cName = cn('project-page')

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);
    const currentUser = useSelector(currentUserSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const canSearchTeam = currentProject?.project['author_id'] === currentUser?.id;
    
    const {project, team, openVacancies, rating} = currentProject ?? {}
    const {title, description, url, contests} = project ?? {}
    const createdAt = project?.['created_at'] ?? '';

    const getTeamsForProject = useCallback(() => {
        dispatch<any>(availableTeamsAction(currentProject?.project?.id ?? 0, getTokenFromCookies()))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [currentProject?.project?.id]);

    const goBackToMyIdeas = () => {
        navigate(ROUTES.USER);
    }
    
    if (!currentProject) {
        return null;
    }

    return (
        <div className={cName()}>
            {params.created && <h3>Проект создан!</h3>}
            <div className={cName('title_card')}>
                <div className={cName('logo')}/>
                <p className={cName('title')}>{title}</p>
            </div>

            <div className={cName('details')}>
                <div className={cName('description_card')}>
                    <div className={cName('team_info')}>
                        <p className={cName('team_amount')}>{team?.length} человек в команде</p>
                        
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

            {canSearchTeam &&
                <div>
                    <button onClick={getTeamsForProject}>Найти чеоовека в команду</button>
                </div>
            }

            {params.created && 
                <button onClick={goBackToMyIdeas}>К списку идей</button>
            }
        </div>
    )
}
export default ProjectPage;