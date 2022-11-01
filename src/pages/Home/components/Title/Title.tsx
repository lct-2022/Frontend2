import React, { memo, useEffect, useMemo, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { allJobsNumSelector, popularJobsSelector } from '../../../../store/selectors/jobs';
import { useSelector } from 'react-redux';
import { CARD_TITLES, TITLE } from './consts';
import { allProjectsSupportedSelector, allProjectsNumSelector } from '../../../../store/selectors/projects';
import {cn} from '@bem-react/classname';

import './Title.css';


const cName = cn('title-home-page')

const TitleHomePage = () => {
    const projectsNum = useSelector(allProjectsNumSelector);
    const projectsSupportedNum = useSelector(allProjectsSupportedSelector);
    const jobsNum = useSelector(allJobsNumSelector);

    const dataToShow = [
        projectsNum,
        projectsSupportedNum,
        jobsNum,
    ];

    const cards = useMemo(() => {
        return (
            <div className={cName('container')}>
                {dataToShow.map((item, index) => (
                    <div key={index} className={cName('card')}>
                        <div className={cName('val')}>{item}</div>
                        
                        <div className={cName('item')}>{CARD_TITLES[index]}</div>
                    </div>
                ))}
            </div>
        )
    }, [dataToShow])

    return (
        <div className={cName()}>
            <h3 className={cName('title')}>{TITLE}</h3>

            {cards}
        </div>
    )
}

export default memo(TitleHomePage);