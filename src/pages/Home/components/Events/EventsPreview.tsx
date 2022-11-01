import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import { getProjects } from '../../../../api/platform';
import { TOKEN } from '../../../../utils/consts';
import { useSelector } from 'react-redux';
import { popularProjectsSelector } from '../../../../store/selectors/projects';
import EventCard from '../EventItem';

const TITLE = 'Предстоящие мероприятия';

const ProjectsPreview = () => {
    const pevents = useSelector(popularProjectsSelector);

    const projectsList = useMemo(() => {
        return (
            <div className="vacancies-preview">
                {pevents.map(({project: {title, description, contests, url}, rating}, index) => (
                    <div key={index}>
                        <EventCard
                            title={title}
                            description={description}
                        />
                    </div>
                ))}
            </div>
        )
    }, [pevents]);

    return (
        <div>
            {TITLE}

            {projectsList}
        </div>
    )
}

export default memo(ProjectsPreview);