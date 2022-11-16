import React, { memo, useEffect, useMemo, useState } from 'react';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';

import {Props} from './types'

import './ProjectsPreview.css';

const TITLE = 'Проекты';

const ProjectsPreview: Props = ({projects}) => {
    const projectsList = useMemo(() => {
        return (
            <div className="projects-preview">
                {projects.map(({project: {title, description, industry, team_size, jobs, id}, rating}, index) => (
                    <ProjectCard
                        title={title}
                        key={index}
                        description={description}
                        industry={industry}
                        teamSize={team_size}
                        jobs={jobs}
                        rating={rating}
                        id={id}
                    />
                ))}
            </div>
        )
    }, [projects]);

    return (
        <div>
            <h3>{TITLE}</h3>

            {projectsList}
        </div>
    )
}

export default memo(ProjectsPreview);