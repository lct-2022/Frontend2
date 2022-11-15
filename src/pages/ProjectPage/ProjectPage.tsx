import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector, currentProjectStagesSelector } from '../../store/selectors/projects';

import { authUserSelector } from '../../store/selectors/users';
import { availableTeamsAction } from '../../store/actions/teams';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Button from '../../components/Button'
import Text from '../../components/Text';
import { ProjectData, ProjectStage } from '../../types';
import { getCompleteStages } from '../../utils/getStages';
import { prepareDate } from '../../utils/grammar';

import { getUserProfile } from '../../api/passport';
import Spinner from '../../components/Spinner';
import Card from '../../components/Card';

import './ProjectPage.css';
import { getProjectStages } from '../../api/platform';
import ProjectRoutes from './components/ProjectRoutes/ProjectRoutes';

const cName = cn('project-page');

const queryClient = new QueryClient();

const MENU = [
    'Этапы развития',
    'Материалы',
    'Команда',
    'Вакансии',
    'Сервисы'
];

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);    
    const authUser = useSelector(authUserSelector);
    const currentProjectStages = useSelector(currentProjectStagesSelector);

    const [stages, setStages] = useState<ProjectStage[]>([]);
    const [project, setProject] = useState<ProjectData>();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const item = sessionStorage.getItem('project');        
        if (item) {
            setProject(JSON.parse(item))
        }
        
        if (currentProject) {
            setProject(currentProject);
            sessionStorage.setItem('project', JSON.stringify(currentProject))
        }

    }, [currentProject]);

    const canSearchTeam = currentProject?.['author_id'] === authUser?.id;
    
    const {team_size, jobs, title, description, url, contests, created_at, author_id = 0} = project ?? {};

    const profileQuery = useQuery('getProfile', () => getUserProfile(author_id));
    const stagesQuery = useQuery('getStages', () => getProjectStages());

    const getTeamsForProject = useCallback(() => {
        new Promise(res => res(dispatch<any>(availableTeamsAction(project?.id ?? 0, getTokenFromCookies()))))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [currentProject?.id]);

    const goBackToMyIdeas = () => {
        navigate(ROUTES.USER);
    };
    
    useEffect(() => {
        if (currentProjectStages && project?.stage_id) {
            setStages(getCompleteStages(currentProjectStages, project?.stage_id)); 
        }
    }, [currentProjectStages, project?.stage_id]);

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
    }, [jobs]);
    
    const stagesMemo = useMemo(() => {
        if (!stages || !stages.length) {
            return null
        }

        return (
            <ul className={cName('stages')}>
                <h3>Этапы проекта</h3>
                {stages.map(({title, description, id}) => (
                    <div key={id}>
                        <div>
                            <Text>{title}</Text>
                        </div>
                        <div>
                            <Text>{description}</Text>
                        </div>
                    </div>

                ))}
            </ul>
        )
    }, [stages]);
    
    if (!currentProject) {
        return null;
    }

    if (profileQuery.isLoading || stagesQuery.isLoading) {
        return <Spinner/>
    }

    if (profileQuery.error || stagesQuery.error) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                {params.created && <h3>Проект создан!</h3>}
                <Card className={cName('title-card')}>
                    <div className={cName('logo')}/>
    
                    <div className={cName('info')}>
                        <p className={cName('title')}>{title}</p>
    
                        <div className={cName('author-info')}>
                            <b>Создатель:</b>

                            <div className={cName('author-info-name')}>
                                <img src={profileQuery.data?.avatar_url} alt="" className={cName('author-ava')}/>
                                <p>{profileQuery.data?.fio}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <ProjectRoutes stages={stagesQuery.data || []}/>
    
                <Card className={cName('details')}>
                    <div className={cName('description_card')}>
                        <div className={cName('team-info')}>
                            <p className={cName('team-amount')}>{team_size} человек в команде</p>
                            
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
    
                        <p className={cName('created')}>Создан {prepareDate(created_at, {project: true})}</p>
    
                        {stagesMemo}
                    </div>
    
                    <div className={cName('vacancies')}>
                        <p>Вакансии</p>
    
                        {jobsOnProject}
                    </div>
    
                    <div className={cName('chats')}>
                        <p>Чаты</p>
    
                        <ul className={cName('chats-list')}>
                          <li><a href="https://ideahunt.ru/chat/c553e30f-e58c-42a3-92ac-01bb4c3bbe33">Публичный</a></li>
                        </ul>
                    </div>
                </Card>
    
                {canSearchTeam &&
                    <div>
                        <Button onClick={getTeamsForProject}>Найти человека в команду</Button>
                    </div>
                }
    
                {params.created && 
                    <Button onClick={goBackToMyIdeas}>К списку идей</Button>
                }
            </div>
        </QueryClientProvider>
    )
}
export default ProjectPage;
