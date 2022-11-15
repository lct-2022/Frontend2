import React, { FC, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from '@bem-react/classname';

import { ProjectStage } from '../../../../types';

import { getCurrentProject } from '../../../../api/platform';
import { getCompleteStages } from '../../../../utils/getStages';

import './ProfileProject.css';
import Text from '../../../../components/Text';

const cName = cn('profile-project');

const clientQury = new QueryClient();

interface IProps {
    id: number;
    title: string;
    description: string;
    teamSize: number;
    allStages: ProjectStage[];
}

const ProfileProject: FC<IProps> = ({id, title, description, teamSize, allStages}) => {
    const {data, error} = useQuery('getProject', () => getCurrentProject(id));
    const stagesIds = getCompleteStages(allStages, data?.stage_id || 0).map(elem => elem.id)

    const projectStages = useMemo(() => {
        return (
            <div className={cName('stages')}>
                {allStages.map(({title, id}) => (
                    <div key={title} className={cName('stage', {active: stagesIds.includes(id)})}>
                        {title}
                    </div>
                ))}
            </div>
        )
    }, [allStages, stagesIds]);

    if (error || !data) {
        return null;
    }

    return (
        <QueryClientProvider client={clientQury}> 
            <div className={cName()}>
                <div className={cName('upper')}>
                    <p className={cName('title')}>{title}</p>

                    <div className={cName('team')}>{teamSize} человек в команде</div>
                </div>

                <Text>{description}</Text> 
                
                {projectStages}
            </div>
        </QueryClientProvider>
    )
}
export default ProfileProject;