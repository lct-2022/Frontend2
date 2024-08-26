import React, { memo } from 'react';
import ProjectCard from '../../../../ui/CommonBlocks/ProjectItem';

import {Props} from './types'

import './ProjectsPreview.css';

const TITLE = 'Проекты';

const ProjectsPreview: Props = ({projects}) => {
    return (
        <div style={{marginTop: '16px'}}>
            <h3>{TITLE}</h3>

            <div className="projects-preview">
                {projects.map(({project: {title, description, industry, team_size, jobs, id}, rating}) => (
                    <ProjectCard
                        key={id}
                        title={title}
                        description={description}
                        industry={industry}
                        teamSize={team_size}
                        jobs={jobs}
                        rating={rating}
                        id={id}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(ProjectsPreview);