import React, { useMemo } from 'react';
import ProjectItem from '../../../Home/components/ProjectItem';
import { Props } from '../../types';
import { cn } from '@bem-react/classname';

import './ProjectsList.css';

const cName = cn('projects-list')

const ProjectsList: Props = ({projects}) => {

    const projectsList = useMemo(() => {
        if (projects.filter(project => !project.hidden).length === 0) {
            return (
                <h3>Проектов, удовлетворяющих заданным условиям, нет</h3>
            )
        }
        return (
            <div className={cName('container')}>
                {projects.map(({project: {title, description, contests, url, id}, rating, hidden}, index) => (
                    <div key={index} className={cName('project', {hidden})}>
                        <ProjectItem
                            title={title}
                            description={description}
                            contest={contests}
                            url={url}
                            rating={rating}
                            id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [projects]);

    return (
        <div>
            <h1>Проекты все</h1>

            {projectsList}
        </div>
    )
}
export default ProjectsList;