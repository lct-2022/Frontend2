import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';

import { ProjectOption } from '../../consts';
import ProjectMenu from '../Menu/ProjectMenu';
import Stages from '../Stages/Stages';
import Vacancies from '../Vacancies/Vacancies';
import { Job, ProjectStage } from '../../../../types/common';

import './ProjectRoutes.css';
import Card from '../../../../ui/Card';

const cName = cn('project-routes');

interface IProps {
    stages: ProjectStage[];
    vacancies: Job[];
    description: string;
}

const ProjectRoutes: FC<IProps> = ({stages, vacancies, description}) => {
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
                <Stages 
                    stagesIds={stages.map(el => el.id)}
                    description={description}
                />
            }

            {shownData === 'vacancies' &&
                <Vacancies vacancies={vacancies}/>
            }

            {shownData === 'materials' &&
                <p>
                    {description}
                </p>
            }
        </div>
    )
}
export default ProjectRoutes;