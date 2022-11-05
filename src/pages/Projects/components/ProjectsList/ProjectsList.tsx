import React, { useMemo } from 'react';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';
import { Props } from '../../types';
import { cn } from '@bem-react/classname';

import './ProjectsList.css';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../../utils/routes';

const cName = cn('projects-list')

const ProjectsList: Props = ({projects}) => {
    const location = useLocation()
    const isFromProfile = location.pathname === ROUTES.USER;

    const projectsList = useMemo(() => {
        if (!projects.length) {
            return (
                <h3>{isFromProfile ? 'У Вас пока нет проектов' : 'На текущий момент проектов нет'}</h3>
            )
        }

        if (projects.filter(project => !project.hidden).length === 0) {
            return (
                <h3>Проектов, удовлетворяющих заданным условиям, нет</h3>
            )
        }
        
        if (!projects) {
            return null;
        }

        return (
            <div className={cName('container')}>
                {projects?.map(({title, description, contests, url, id, hidden}, index) => (
                    <div key={index} className={cName('project', {hidden})}>
                        <ProjectCard
                            title={title}
                            description={description}
                            contest={contests}
                            url={url}
                            id={id}
                            author_id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [projects]);

    return (
        <div>
            <h1>{isFromProfile ? 'Ваши проекты:' : 'Проекты'}</h1>

            {projectsList}
        </div>
    )
}
export default ProjectsList;