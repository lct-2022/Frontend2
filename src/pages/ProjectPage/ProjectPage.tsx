import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector, currentProjectStagesSelector } from '../../store/selectors/projects';

import './ProjectPage.css';
import { authUserSelector } from '../../store/selectors/users';
import { availableTeamsAction } from '../../store/actions/teams';
import { getProjectChatIds} from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Button from '../../components/Button'
import Text from '../../components/Text';
import { ProjectStage } from '../../types';
import { getCompleteStages } from '../../utils/getStages';

const cName = cn('project-page')

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);
    const authUser = useSelector(authUserSelector);
    const currentProjectStages = useSelector(currentProjectStagesSelector);

    const [stages, setStages] = useState<ProjectStage[]>([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const canSearchTeam = currentProject?.['author_id'] === authUser?.id;
    
    const {team_size, jobs, title, description, url, contests, created_at} = currentProject ?? {};

    const getTeamsForProject = useCallback(() => {
        new Promise(res => res(dispatch<any>(availableTeamsAction(currentProject?.id ?? 0, getTokenFromCookies()))))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [currentProject?.id]);

    const chatIds = await getProjectChatIds(currentProject?.id ?? 0, getTokenFromCookies());
    
    const chatsOnProject = useMemo(() => {
        if (!chatIds || !chatIds.length) {
            return <Text>Чатов нет</Text>
        }

        return (
            <ul className={cName('chats')}>
                {chatIds.map((chatId) => (
                    <li key={chatId}>Тут будет ссылка на чат: {chatId}</li>
                ))}
            </ul>
        )
    }, [chatIds])
    
    const goBackToMyIdeas = () => {
        navigate(ROUTES.USER);
    };

    useEffect(() => {
        currentProjectStages && currentProject?.stage_id && 
            setStages(getCompleteStages(currentProjectStages, currentProject?.stage_id));
    }, [currentProjectStages, currentProject?.stage_id]);

    const jobsOnProject = useMemo(() => {
        if (!jobs || !jobs.length) {
            return <Text>Открытых вакансий нет</Text>
        }

        return (
            <ul className={cName('vacancies')}>
                {jobs.map(({title, id}) => (
                    <li key={id}>{title}</li>
                ))}
            </ul>
        )
    }, [jobs])
    
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

                <div className={cName('chats')}>
                    <p>Чаты</p>
                    {jobsOnProject}
                </div>

                <div className={cName('vacancies')}>
                    <p>Вакансии</p>

                    {jobsOnProject}
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
