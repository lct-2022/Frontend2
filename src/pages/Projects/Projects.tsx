import React, { FC, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getAllProjects, getProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { Project, ProjectData } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';

import './Projects.css';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../store/selectors/users';

const cName = cn('projects-page');

const queryClient = new QueryClient();

interface Props {
    fromProfile?: boolean;
}

const Projects: FC<Props> = () => {
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);

    const {isLoading, error, data} = useQuery('allProjects', () => getAllProjects('*'));

    useEffect(() => {
        setAllProjects(data?.items?.map(project => ({...project, hidden: false})) || []);
    }, [data]);

    if (isLoading) return <h1>Loading</h1>
    if (error) return <h1>error</h1>

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <div className={cName('options')}>
                    <div className={cName('list')}>
                        <ProjectsList projects={allProjects}/>
                    </div>
    
                    {<div className={cName('filtration')}>
                        <Filtration 
                            projects={allProjects}
                            setProjects={setAllProjects}
                        />
                    </div>}
                </div>
    
                {/* <Pagination projects={allProjects}/> */}
            </div>
        </QueryClientProvider>
    )
}
export default Projects;