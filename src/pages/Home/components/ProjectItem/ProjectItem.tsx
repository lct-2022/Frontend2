import React, { memo} from 'react';
import { cn } from '@bem-react/classname'


import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../../utils/routes';

const cName = cn('project-item');

const TITLE_RATE = 'Рейтинг';

const ProjectItem: Props = ({
    title, 
    description,
    contest,
    url,
    rating,
}) => {
    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <div className={cName('text', {title: true})}>
                        <a href={ROUTES.PROJECT}>{title}</a>
                    </div>

                    <div className={cName('text', {description: true})}>
                        {description}
                    </div>

                </div>

                <div className={cName('details')}>
                    <span>{contest}</span>
                    <span>{url}</span>
                </div>
            </div>

            <div className={cName('rating')}>
                <p>{TITLE_RATE}:&nbsp;</p>
                <b>{rating}</b>
            </div>
        </div>
    )
}

export default memo(ProjectItem);