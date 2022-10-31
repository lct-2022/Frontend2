import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPopularProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { IProject } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';

import './Projects.css';


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
        <div>
            <h1>Projects</h1>

            <div className="all-projects-continer">
                <div className="all-projects-data">
                    <div>
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

        </div>
    )
}
export default ProjectsPage;