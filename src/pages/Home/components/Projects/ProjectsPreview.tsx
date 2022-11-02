import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './ProjectsPreview.css';
import { getProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
import { useSelector } from 'react-redux';
import { popularProjectsSelector } from '../../../../store/selectors/projects';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';

const TITLE = 'Проекты';

const ProjectsPreview = () => {
    const projects = useSelector(popularProjectsSelector);

    const projectsList = useMemo(() => {
        return (
            <div className="projects-preview">
                {projects.map(({project: {title, description, contests, url, id}, rating}, index) => (
                    <div key={index}>
                        <ProjectCard
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
            <h3>{TITLE}</h3>

            {projectsList}
        </div>
    )
}

export default memo(ProjectsPreview);