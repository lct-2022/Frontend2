import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getPopularProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { IProject } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';

import './Projects.css';

const cName = cn('projects-page')

function ProjectsPage() {
    const [allProjects, setAllProjects] = useState<IProject[]>([]);

    useEffect(() => {
        getPopularProjects(getTokenFromCookies())
            .then(data => {
                setAllProjects(data.result.map(project => ({...project, hidden: false})));
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

                    <div>
                        <Filtration 
                            projects={allProjects}
                            setProjects={setAllProjects}
                        />
                    </div>
                </div>

                {/* <Pagination projects={allProjects}/> */}
            </div>
    )
}
export default ProjectsPage;