import React, {FC, memo} from 'react';
import {cn} from '@bem-react/classname';

import { OPTIONS, ProjectOption } from '../../consts';
import Text from '../../../../ui/Text';

import './ProjectMenu.css';

const cName = cn('project-menu');

interface IProps {
    currentOption: ProjectOption,
    setOptions: (point: ProjectOption) => void;
}

const ProjectMenu: FC<IProps> = ({currentOption, setOptions}) => {
    return (
        <div className={cName()}>
            {Object.entries(OPTIONS).map(([key, point], index) => (
                <div 
                    key={index}
                    onClick={() => setOptions(key as ProjectOption)}
                    className={cName('point')}
                >
                    <Text
                        type="bold"
                    >
                        {point}
                    </Text>
                    {key === currentOption && <div className={cName('line')}/>}
                </div>

            ))}
        </div>
    )
}

export default memo(ProjectMenu);
