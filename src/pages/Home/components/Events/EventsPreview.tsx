import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import { getPopularProjects } from '../../../../api/platform';
import { useSelector } from 'react-redux';
import EventCard from '../EventItem';
import { evensSelector } from '../../../../store/selectors/events';

const TITLE = 'Предстоящие мероприятия';

const ProjectsPreview = () => {
    const events = useSelector(evensSelector);

    const eventsList = useMemo(() => {
        return (
            <div className="vacancies-preview">
                {/* {events.map(({project: {title, description, contests, url}, rating}, index) => (
                    <div key={index}>
                        <EventCard
                            title={title}
                            description={description}
                        />
                    </div>
                ))} */}
            </div>
        )
    }, [events]);

    return (
        <div>
            {TITLE}

            {eventsList}
        </div>
    )
}

export default memo(ProjectsPreview);