import React, { FC, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { Project } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';

import './Projects.css';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../store/selectors/users';
import { useSearchParams } from 'react-router-dom';

const cName = cn('projects-page')

interface Props {
    fromProfile?: boolean;
}

const Projects: FC<Props> = ({fromProfile}) => {
    const currentUser = useSelector(currentUserSelector)

    const [allProjects, setAllProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        // if (currentUser && fromProfile) {
        //     setAllProjects(currentUser.projects || []);
        //     return;
        // }
        getProjects()
            .then(data => {
                setAllProjects(data?.map(project => ({...project, hidden: false})))
            })
    }, []);

    return (
        <div className={cName()}>
            <div className={cName('options')}>
                <div className={cName('list')}>
                    <ProjectsList projects={allProjects}/>
                </div>

                {!fromProfile && <div className={cName('filtration')}>
                    <Filtration 
                        projects={allProjects}
                        setProjects={setAllProjects}
                    />
                </div>}
            </div>

                {/* <Pagination projects={allProjects}/> */}
        </div>
    )
}
export default Projects;