import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

import './ProjectPage.css';

const cName = cn('project-page');

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
            console.log('ITEM !!!!!!!!!!!!!!!!!!');
            setProject(JSON.parse(item))
        }
        
        if (currentProject) {
            setProject(currentProject);
            console.log('HERE');
            
            sessionStorage.setItem('project', JSON.stringify(currentProject))
        }

    }, [currentProject]);

    const canSearchTeam = currentProject?.['author_id'] === authUser?.id;
    
    const {team_size, jobs, title, description, url, contests, created_at} = project ?? {};

    const getTeamsForProject = useCallback(() => {
        new Promise(res => res(dispatch<any>(availableTeamsAction(project?.id ?? 0, getTokenFromCookies()))))
            .then(() => {
                navigate(ROUTES.TEAMS)
            });
    }, [currentProject?.id]);

    const goBackToMyIdeas = () => {
        navigate(ROUTES.USER);
    };
    console.log('====>', currentProjectStages);
    
    useEffect(() => {
        if (currentProjectStages && project?.stage_id) {
            setStages(getCompleteStages(currentProjectStages, project?.stage_id));
            console.log('===>', getCompleteStages(currentProjectStages, project?.stage_id));
            
        }
    }, [currentProjectStages, project?.stage_id]);

    console.log(project?.stage_title);

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

    return (
        <div className={cName()}>
            {params.created && <h3>Проект создан!</h3>}
            <div className={cName('title-card')}>
                <div className={cName('logo')}/>
                <p className={cName('title')}>{title}</p>
            </div>

            <div className={cName('details')}>
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

                    <p className={cName('created')}>Создан {prepareDate(created_at)}</p>

                    {stagesMemo}
                </div>

                <div className={cName('vacancies')}>
                    <p>Вакансии</p>

                    {jobsOnProject}
                </div>
            </div>

            {canSearchTeam &&
                <div>
                    <Button onClick={getTeamsForProject}>Найти человека в команду</Button>
                </div>
            }

            {params.created && 
                <Button onClick={goBackToMyIdeas}>К списку идей</Button>
            }
        </div>
    )
}
export default ProjectPage;