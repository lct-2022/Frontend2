import React, { useMemo } from 'react';
import ProjectItem from '../../../Home/components/ProjectItem';
import { Props } from '../../types';

const ProjectsList: Props = ({projects}) => {

    const projectsList = useMemo(() => {
        return (
            <div className="projects-container">
                {projects.map(({project: {title, description, contests, url}, rating}, index) => (
                    <div key={index}>
                        <ProjectItem
                            title={title}
                            description={description}
                            contest={contests}
                            url={url}
                            rating={rating}
                        />
                    </div>
                ))}
            </div>
        )
    }, [projects]);

    return (
        <div>
            <h1>Проекты все</h1>
            {projectsList}
        </div>
    )
}
export default ProjectsList;