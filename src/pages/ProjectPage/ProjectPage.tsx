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
import { ProjectData, ProjectStage } from '../../types';
import { getCompleteStages } from '../../utils/getStages';

import { getUserProfile } from '../../api/passport';
import Spinner from '../../components/Spinner';
import Card from '../../components/Card';

import { getProjectStages } from '../../api/platform';
import ProjectRoutes from './components/ProjectRoutes/ProjectRoutes';

import './ProjectPage.css';

const cName = cn('project-page');

const queryClient = new QueryClient();

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
    
    const {jobs, title, description, author_id = 0} = project ?? {};

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

                <ProjectRoutes
                    stages={stages || []}
                    vacancies={jobs || []}
                    description={description || ''}
                />
    
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
