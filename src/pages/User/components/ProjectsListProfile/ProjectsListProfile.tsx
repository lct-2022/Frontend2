import React, { FC, useEffect, useMemo, useState } from 'react';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';
import { cn } from '@bem-react/classname';

import { useLocation, useParams } from 'react-router';
import { ProjectData } from '../../../../types';
import { useSelector } from 'react-redux';
import { authUserSelector, currentUserSelector } from '../../../../store/selectors/users';

import './ProjectsList.css';
import ProfileProject from '../ProfileProject/ProfileProject';
import { currentProjectStagesSelector } from '../../../../store/selectors/projects';

const cName = cn('projects-list-profile');

interface IProps {
    projects: ProjectData[];
}

const ProjectsListProfile: FC<IProps> = ({projects}) => {
    const currentProjectStages = useSelector(currentProjectStagesSelector);

    const params = useParams();

    const projectsList = useMemo(() => {
        if (!projects.length) {
            return (
                <h3>{params.search ? 'У эксперта нет идей' : 'У Вас пока нет идей'}</h3>
            )
        }
        
        if (!projects) {
            return null;
        }

        return (
            <div className={cName('container')}>
                {projects.map(({title, description, team_size, id}, index) => (
                    <div key={index} className={cName('project')}>
                        <ProfileProject
                            title={title}
                            description={description}
                            id={id}
                            teamSize={team_size || 0}
                            allStages={currentProjectStages || []}
                        />
                    </div>
                ))}
            </div>
        )
    }, [projects, params.search]);

    return (
        <div>
            {!params.search && <h3 className={cName('header-ideas')}>Идеи</h3>}

            {projectsList}
        </div>
    )
}
export default ProjectsListProfile;