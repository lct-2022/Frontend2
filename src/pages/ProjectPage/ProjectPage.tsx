import React, { useCallback } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './ProjectPage.css';
import { authUserSelector } from '../../store/selectors/users';
import { availableTeamsAction } from '../../store/actions/teams';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Button from '../../components/Button'

const cName = cn('project-page')

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);
    const authUser = useSelector(authUserSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const canSearchTeam = currentProject?.['author_id'] === authUser?.id;
    
    const {team_size, jobs, title, description, url, contests, created_at} = currentProject ?? {};

    const getTeamsForProject = useCallback(() => {
        dispatch<any>(availableTeamsAction(currentProject?.id ?? 0, getTokenFromCookies()))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [currentProject?.id]);

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
                        <p className={cName('team_amount')}>{team_size} человек в команде</p>
                        
                        <p>{jobs?.length ? `${jobs?.length} открытых вакансий` : 'Открытых вакансий нет'}</p>
                    </div>

                    <p className={cName('description')}>{description}</p>

                    <a 
                        href={url || 'https://ya.ru/'}
                        target="_blank"
                        rel="noopener norefere"
                    >
                        {url || ''}  
                    </a>

                    <p className={cName('contests')}>{contests}</p>

                    <p className={cName('created')}>{created_at}</p>
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
                    <Button onClick={getTeamsForProject}>Найти чеоовека в команду</Button>
                </div>
            }

            {params.created && 
                <Button onClick={goBackToMyIdeas}>К списку идей</Button>
            }
        </div>
    )
}
export default ProjectPage;