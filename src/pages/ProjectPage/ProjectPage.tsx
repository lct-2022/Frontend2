import React from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './ProjectPage.css';

const cName = cn('project-page')

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);

    if (!currentProject) return null;

    const {project, team, openVacancies, rating} = currentProject
    const {title, description, url, contests} = project
    const createdAt = project['created-at'];

    return (
        <div className={cName()}>
            <div className={cName('title-card')}>
                <div className={cName('logo')}/>
                <p className={cName('title')}>{title}</p>
            </div>

            <div className={cName('details')}>
                <div className={cName('description-card')}>
                    <div className={cName('team-info')}>
                        <p className={cName('team-amount')}>{team.length} человек в команде</p>
                        
                        <p>{openVacancies.length} открытых вакансий</p>
                    </div>
                    <p className={cName('description')}>{description}</p>
                    <a 
                        href={url}
                        target="_blank"
                        rel="noopener norefere"
                    >
                        {url || 'https://ya.ru/'}  
                    </a>
                    <p className={cName('contests')}>{contests}</p>
                    <p className={cName('created')}>{createdAt}</p>
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

        </div>
    )
}
export default ProjectPage;