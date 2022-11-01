import React from 'react';
import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { currentProjectSelector } from '../../store/selectors/projects';

import './ProjectPage.css';

const cName = cn('project-card')

function ProjectPage() {
    const currentProject = useSelector(currentProjectSelector);
    console.log(currentProject?.project?.id)

    if (!currentProject) return null;

    const {project, teamAmount, openVacanciesAmount} = currentProject
    const {title, description, contests} = project
    const createdAt = project['created-at'];

    return (
        <div className={cName()}>
            <div className={cName('title-card')}>
                <div className={cName('logo')}/>
                <p className={cName('title')}>{title}</p>
            </div>

            <div className={cName('details')}>
                <div className={cName('description-card')}>
                    <p>{teamAmount} человек в команде</p>
                    <p>{openVacanciesAmount} открытых вакансий</p>
                    <p className={cName('description')}>{description}</p>
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
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ProjectPage;