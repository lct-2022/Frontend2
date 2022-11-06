import React, { FC, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getAllProjects, getIndustries, getInnovationTypes } from '../../api/platform';
import { Project, ProjectData } from '../../types';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';

import './Projects.css';
import Spinner from '../../components/Spinner';
import { LIMITS } from '../../utils/consts';

const cName = cn('projects-page');

const queryClient = new QueryClient();

interface Props {
    fromProfile?: boolean;
}

const Projects: FC<Props> = () => {
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);

    const allProjectsResponce = useQuery('allProjects', () => getAllProjects('*', {limit: LIMITS.PROJECTS}));
    const innovationTypesResponce = useQuery('getInnovationtypes', () => getInnovationTypes());
    const industriesTypesResponce = useQuery('getInnovationtypes', () => getIndustries());

    useEffect(() => {
        setAllProjects(allProjectsResponce.data?.items?.map(project => ({...project, hidden: false})) || []);
    }, [allProjectsResponce.data]);

    if (allProjectsResponce.isLoading || innovationTypesResponce.isLoading || industriesTypesResponce.isLoading) {
        return <Spinner/>
    } 

    if (allProjectsResponce.error || innovationTypesResponce.error || industriesTypesResponce.error) {
        throw new Error();
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <div className={cName('options')}>
                    <div className={cName('list')}>
                        <ProjectsList projects={allProjects} setProjects={setAllProjects}/>
                    </div>
    
                    {<div className={cName('filtration')}>
                        <Filtration 
                            projects={allProjects}
                            setProjects={setAllProjects}
                            innovationTypes={innovationTypesResponce.data || []}
                            industries={industriesTypesResponce.data || []}
                        />
                    </div>}
                </div>
    
                {/* <Pagination projects={allProjects}/> */}
            </div>
        </QueryClientProvider>
    )
}
export default Projects;