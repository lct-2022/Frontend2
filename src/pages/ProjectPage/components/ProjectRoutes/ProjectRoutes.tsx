import React, { useCallback, useContext, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';

import './Routes.css';
import { ProjectOption } from '../../consts';
import ProjectMenu from '../Menu/ProjectMenu';
import Stages from '../Stages/Stages';
import Vacancies from '../Vacancies/Vacancies';

const cName = cn('user-routes');

const ProjectRoutes = () => {
    const [shownData, setShowData] = useState<ProjectOption>('stages');

    const setOptions = useCallback((point: ProjectOption) => {
        setShowData(point)
    }, [])    

    return (
        <div className={cName()}>        
            <ProjectMenu 
                currentOption={shownData}
                setOptions={setOptions}
            />

            {shownData === 'stages' &&
                <Stages/>
            }

            {shownData === 'vacancies' &&
                <Vacancies vacancies={[]}/>
            }
        </div>
    )
}
export default ProjectRoutes;