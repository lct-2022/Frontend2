import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { getPopularProjects } from '../../../../api/platform';
import { useSelector } from 'react-redux';
import { popularProjectsSelector } from '../../../../store/selectors/projects';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';

import {Props} from './types'

import './ProjectsPreview.css';
const TITLE = 'Проекты';



const ProjectsPreview: Props = ({projects}) => {
    const projectsList = useMemo(() => {
        return (
            <div className="projects-preview">
                {projects.map(({project: {title, description, contests, url, id}, rating}, index) => (
                    <ProjectCard
                        title={title}
                        key={index}
                        description={description}
                        contest={contests}
                        url={url}
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