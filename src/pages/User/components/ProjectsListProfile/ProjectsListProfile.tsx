import React, { FC, useEffect, useMemo, useState } from 'react';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';
import { cn } from '@bem-react/classname';

import './ProjectsList.css';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../../utils/routes';
import { ProjectData } from '../../../../types';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../../store/selectors/users';

const cName = cn('projects-list-profile');

const ProjectsListProfile = () => {
    const currentUser = useSelector(currentUserSelector)
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        setAllProjects(currentUser?.projects || [])
    }, [currentUser?.projects])

    const projectsList = useMemo(() => {
        if (!allProjects.length) {
            return (
                <h3>У Вас пока нет проектов</h3>
            )
        }
        
        if (!allProjects) {
            return null;
        }

        return (
            <div className={cName('container')}>
                {allProjects.map(({title, description, contests, url, id, author_id}, index) => (
                    <div key={index} className={cName('project')}>
                        <ProjectCard
                            title={title}
                            description={description}
                            contest={contests}
                            url={url}
                            id={id}
                            author_id={author_id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allProjects]);

    return (
        <div>
            <h1>Ваши проекты:</h1>

            {projectsList}
        </div>
    )
}
export default ProjectsListProfile;