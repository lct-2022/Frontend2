import React, { memo, useCallback} from 'react';
import { cn } from '@bem-react/classname'


import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../../utils/routes';
import { getCurrentProject } from '../../../../api/platform';
import { getCurrentProjectAction } from '../../../../store/actions/projects';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cName = cn('project-item');

const TITLE_RATE = 'Рейтинг';

const ProjectItem: Props = ({
    title, 
    description,
    contest,
    url,
    rating,
    id,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passToProject = useCallback(() => {
        dispatch<any>(getCurrentProjectAction(id))
            .then(() => {
                navigate(ROUTES.PROJECT)
            });
    }, [id]);

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <p className={cName('text', {title: true})} onClick={passToProject}>
                        {title}
                    </p>

                    <p className={cName('text', {description: true})}>
                        {description}
                    </p>

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