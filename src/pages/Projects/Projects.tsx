import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPopularProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { IProject } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';


function ProjectsPage() {
    const [allProjects, setAllProjects] = useState<IProject[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getPopularProjects(getTokenFromCookies())
        .then(data => {
            setAllProjects(data.result)
        })
    }, []);

    console.log(allProjects);
    
    const projects = useMemo(() => {
        return (
            <div className="projects-container">
                {allProjects.map(() => (null))}
            </div>
        )
    }, [allProjects]);

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