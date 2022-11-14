import React, {FC, memo} from 'react';
import {cn} from '@bem-react/classname';

import { ProjectOption } from '../../consts';

import './ProjectMenu.css';

const cName = cn('project-menu');

const MENU = [
    'Этапы развития',
    'Материалы',
    'Команда',
    'Вакансии',
    'Сервисы'
];

interface IProps {
    currentOption: ProjectOption,
    setOptions: (point: ProjectOption) => void;
}

const ProjectMenu: FC<IProps> = ({}) => {
    return (
        <div className={cName()}>
            {MENU.map(point => (
                <div 
                    key={point}
                    className={cName('point')}
                >
                    {point}
                </div>
            ))}
        </div>
    )
}

export default memo(ProjectMenu);
