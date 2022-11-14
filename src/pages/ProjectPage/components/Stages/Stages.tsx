import React, {FC, memo} from 'react';
import {cn} from '@bem-react/classname';

import { ProjectStage } from '../../../../types';

import './Stages.css';

const cName = cn('project-stages');

interface IProps {
    stages: ProjectStage[];
}

const Stages: FC<IProps> = ({stages}) => {
    return (
       <div className={cName()}>
           {stages.map(({id, title, description}) => (
               <div key={id}>

                   {title}
                   {description}

                </div>
           ))}
       </div>
    )
}

export default memo(Stages);
