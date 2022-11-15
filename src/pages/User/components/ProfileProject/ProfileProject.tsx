import React, { FC, memo, useMemo } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from '@bem-react/classname';

import { ProjectStage, Undefinedable } from '../../../../types';

import { getCurrentProject } from '../../../../api/platform';
import { getCompleteStages } from '../../../../utils/getStages';
import Text from '../../../../components/Text';

import './ProfileProject.css';

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
    const stagesIds = getCompleteStages(allStages, data?.stage_id || 0).map(elem => elem.id);
    
    const projectStages = useMemo(() => {
        if (!data || !allStages || !stagesIds) {
            return null;
        }
        return (
            <div className={cName('stages')}>
                {allStages.map(({title, id}) => (
                    <div key={title} className={cName('stage', {active: stagesIds.includes(id)})}>
                        {title}
                    </div>
                ))}
            </div>
        )
    }, [allStages, data, stagesIds]);

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
export default memo(ProfileProject);