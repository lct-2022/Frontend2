import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { allJobsNumSelector, popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';
import { CARD_TITLES, TITLE } from './consts';
import { allProjectsSupportedSelector, popularProjectsSelector } from '../../../../store/selectors/projects';
import { allProfilesNumSelector } from '../../../../store/selectors/users';

import './Title.css';

const TitleHomePage = () => {
    const projectsNum = useSelector(allProfilesNumSelector);
    const projectsSupportedNum = useSelector(allProjectsSupportedSelector);
    const jobsNum = useSelector(allJobsNumSelector);

    const dataToShow = [
        projectsNum,
        projectsSupportedNum,
        jobsNum,
    ];

    const cards = useMemo(() => {
        return (
            <div className="cards-title-home">
                {dataToShow.map((item, index) => (
                    <div key={index} className="card-title-home">
                        <div className="card-title-home-text">{item}</div>
                        
                        <div className="card-title-home-text">{CARD_TITLES[index]}</div>
                    </div>
                ))}
            </div>
        )
    }, [dataToShow])

    return (
        <div>
            <h3>{TITLE}</h3>

            {cards}
        </div>
    )
}

export default memo(TitleHomePage);