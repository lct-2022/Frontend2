import React, { FC, memo, useState } from 'react';
import {useQuery} from 'react-query';
import { cn } from '@bem-react/classname';

import { ProjectStage } from '../../../../types/common';
import { getCurrentProject } from '../../../../api/platform';
import { getCompleteStages } from '../../../../utils/getStages';
import Text from '../../../../ui/Text';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { getCurrentProjectAction } from '../../../../store/actions/projects';
import Spinner from '../../../../ui/Spinner';

import './ProfileProject.css';

const arrow = require('../../../../assets/arrow.svg').default;

const cName = cn('profile-project');

interface IProps {
    id: number;
    title: string;
    description: string;
    teamSize: number;
    allStages: ProjectStage[];
}

const ProfileProject: FC<IProps> = ({id, title, description, teamSize, allStages}) => {
    const {data, error} = useQuery('getProject', () => getCurrentProject(id));

    const stagesIds = getCompleteStages(allStages, data?.stage_id || 0)
        .map(elem => elem.id);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const passToProject = () => {
        setIsLoading(true);

        new Promise((res) => res(dispatch<any>(getCurrentProjectAction(id))))
            .then(() => {
                navigate(ROUTES.PROJECT);
                setIsLoading(false);
            })
    };

    if (error) throw new Error('Failed to get project');

    if(isLoading) return <Spinner/>

    if (!data) return null;

    return (
        <div className={cName()}>
            <div className={cName('upper')}>
                <p className={cName('title')} onClick={passToProject}>{title}</p>

                <div className={cName('team')}>{teamSize} человек в команде</div>
            </div>

            <Text>{description}</Text> 
                
            <div className={cName('stages')}>
                {allStages.map(({title, id}) => (
                    <div key={id} className={cName('stage', {active: stagesIds.includes(id)})}>
                        {title}
                    </div>
                ))}
            </div>

            <div className={cName('wrapper')}>
                <img src={arrow} alt="" onClick={passToProject} className={cName('arrow')}/>
            </div>
        </div>
    )
}

export default memo(ProfileProject);