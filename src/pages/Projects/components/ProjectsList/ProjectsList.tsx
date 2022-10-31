import React, { useMemo } from 'react';
import ProjectItem from '../../../Home/components/ProjectItem';
import { Props } from '../../types';
import classname from 'classnames';

const ProjectsList: Props = ({projects}) => {

    const projectsList = useMemo(() => {
        return (
            <div className="projects-container">
                {projects.map(({project: {title, description, contests, url}, rating, hidden}, index) => (
                    <div key={index} className={`project${hidden ? '-hidden' : ''}`}>
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