import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import { getPopularProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
import { useSelector } from 'react-redux';
import { popularProjectsSelector } from '../../../../store/selectors/projects';
import EventCard from '../EventItem';

const TITLE = 'Предстоящие мероприятия';

const ProjectsPreview = () => {
    const projects = useSelector(popularProjectsSelector);

    const projectsList = useMemo(() => {
        return (
            <div className="vacancies-preview">
                {projects.map(({project: {title, description, contests, url}, rating}, index) => (
                    <div key={index}>
                        <EventCard
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
            {TITLE}

            {projectsList}
        </div>
    )
}

export default memo(ProjectsPreview);