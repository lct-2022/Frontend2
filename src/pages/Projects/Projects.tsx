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

const cName = cn('projects-page')

interface Props {
    own?: boolean;
}

const Projects: FC<Props> = ({own}) => {
    const currentUser = useSelector(currentUserSelector)

    const [allProjects, setAllProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        getProjects()
            .then(data => {
                if (currentUser && own) {
                    setAllProjects(data.result.map(project => ({...project, hidden: false}))
                        .filter(el => el.project['author-id'] === currentUser?.id)
                    )
                } else {
                    setAllProjects(data.result.map(project => ({...project, hidden: false})))
                }  
            })
    }, []);

    console.log(allProjects.map(el => el.project.id));

    return (
        <div className={cName()}>
            <h1>Projects</h1>

                <div className={cName('options')}>
                    <div className={cName('list')}>
                        <ProjectsList projects={allProjects}/>
                    </div>

                    {!own && <div className={cName('filtration')}>
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