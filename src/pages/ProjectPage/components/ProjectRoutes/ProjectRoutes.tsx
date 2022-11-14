import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';

import './Routes.css';
import { ProjectOption } from '../../consts';
import ProjectMenu from '../Menu/ProjectMenu';
import Stages from '../Stages/Stages';
import Vacancies from '../Vacancies/Vacancies';
import { ProjectStage } from '../../../../types';

const cName = cn('user-routes');

interface IProps {
    stages: ProjectStage[];
}

const ProjectRoutes: FC<IProps> = ({stages}) => {
    const [shownData, setShowData] = useState<ProjectOption>('stages');

    const setOptions = useCallback((point: ProjectOption) => {
        setShowData(point)
    }, []);

    return (
        <div className={cName()}>        
            <ProjectMenu 
                currentOption={shownData}
                setOptions={setOptions}
            />

            {shownData === 'stages' &&
                <Stages stages={stages}/>
            }

            {shownData === 'vacancies' &&
                <Vacancies vacancies={[]}/>
            }
        </div>
    )
}
export default ProjectRoutes;