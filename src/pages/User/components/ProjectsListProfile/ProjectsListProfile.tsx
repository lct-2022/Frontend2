import React, { FC, useEffect, useMemo, useState } from 'react';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';
import { cn } from '@bem-react/classname';

import './ProjectsList.css';
import { useLocation, useParams } from 'react-router';
import { ROUTES } from '../../../../utils/routes';
import { ProjectData } from '../../../../types';
import { useSelector } from 'react-redux';
import { authUserSelector, currentUserSelector } from '../../../../store/selectors/users';

const cName = cn('projects-list-profile');

const ProjectsListProfile = () => {
    const params = useParams();

    const currentUser = useSelector(currentUserSelector)
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);
    console.log(currentUser);
    
    useEffect(() => {
        setAllProjects(currentUser?.projects || [])
    }, [currentUser?.projects])

    const projectsList = useMemo(() => {
        if (!allProjects.length) {
            return (
                <h3>{params.search ? 'У эксперта нет проектов' : 'У Вас пока нет проектов'}</h3>
            )
        }
        
        if (!allProjects) {
            return null;
        }

        return (
            <div className={cName('container')}>
                {allProjects.map(({title, description, industry, team_size, jobs, id}, index) => (
                    <div key={index} className={cName('project')}>
                        <ProjectCard
                            title={title}
                            description={description}
                            id={id}
                            industry={industry}
                            teamSize={team_size}
                            jobs={jobs}
                        />
                    </div>
                ))}
            </div>
        )
    }, [allProjects]);

    return (
        <div>
            {!params.search && <h1>Ваши проекты:</h1>}

            {projectsList}
        </div>
    )
}
export default ProjectsListProfile;