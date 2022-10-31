import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './ProjectsPreview.css';
import { getPopularProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
import { useSelector } from 'react-redux';
import { popularProjectsSelector } from '../../../../store/selectors/projects';
import ProjectItem from '../ProjectItem';

const TITLE = 'Проекты';

const ProjectsPreview = () => {
    const projects = useSelector(popularProjectsSelector);

    const projectsList = useMemo(() => {
        return (
            <div className="projects-preview">
                {projects.map(({project: {title, description, contests, url}, rating}, index) => (
                    <div key={index}>
                        <ProjectItem
                            title={title}
                            description={description}
                            contest={contests}
                            url={url}
                            rating={rating}
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