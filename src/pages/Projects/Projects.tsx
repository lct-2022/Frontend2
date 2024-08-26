import React, { ChangeEvent, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useQuery} from 'react-query';
import { cn } from '@bem-react/classname';

import { getAllProjects } from '../../api/platform';
import { ProjectData } from '../../types/common';
import ProjectsList from './components/ProjectsList';
import Filtration from './components/Filtration';
import Spinner from '../../ui/Spinner';
import { LIMITS } from '../../utils/consts';
import { handleError } from '../../utils/handlers';
import { parseStringForDiapazon } from '../../utils/parse';

import './Projects.css';

const cName = cn('projects-page');

interface Props {
    fromProfile?: boolean;
}

const Projects: FC<Props> = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);

    const allProjects = useQuery('allProjects', () => getAllProjects('*', {limit: LIMITS.PROJECTS}));

    useEffect(() => {
        setProjects(allProjects.data?.items?.map(project => ({...project, hidden: false})) || []);
    }, [allProjects.data]);

    const filterProjects = (callback: SetStateAction<ProjectData[]>) => {
        setProjects(callback);
    }

    // Filters
    const filterByIndustries = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        filterProjects(prev => {
            return prev.map(project => checked && project.industry !== value
                ? {...project, hidden: true} 
                : {...project, hidden: false} 
            );
        });
    }, []);

    const filterByInnivationTypes = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && project.innovation_type !== value
                ? {...project, hidden: true} 
                : {...project, hidden: false}
            );
        });
    }, [setProjects]);

    const filterByTags = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => {
                if (checked && !(project.innovations.includes(value) 
                    || project.description.includes(value) 
                    || project.title.includes(value)
                    || project.industry.includes(value))
                ) {
                    return {...project, hidden: true};
                } else {
                    return {...project, hidden: false}
                }  
            });
        });
    }, [setProjects]);

    const filterTeamSize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(value);
            
            return prev.map(project => checked && ((project.team_size || 0) <= min || (project.team_size || 0) >= max)
                ? {...project, hidden: true} 
                : {...project, hidden: false}   
            );
        });
    }, [setProjects]);

    const filterIsActive = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && !project.jobs?.length ? {...project, hidden: true} : {...project, hidden: false});   
        });
    }, [setProjects, projects]);

    const filterIsNotActive = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && project.jobs?.length ? {...project, hidden: true} : {...project, hidden: false});   
        });
    }, [setProjects, projects]);
    // Filters

    const setNewProjects = (newProjects: ProjectData[]) => {
        setProjects(newProjects);
    }

    if (allProjects.isLoading) return <Spinner/>;

    handleError({
        projects: allProjects,
    });

    return (
        <div className={cName()}>
            <div className={cName('options')}>
                <div className={cName('list')}>
                    <ProjectsList projects={projects} setNewProjects={setNewProjects}/>
                </div>
    
                <div className={cName('filtration')}>
                    <Filtration
                        filterByIndustries={filterByIndustries}
                        filterByInnivationTypes={filterByInnivationTypes}
                        filterByTags={filterByTags}
                        filterByTeamSize={filterTeamSize}
                        filterIsActive={filterIsActive}
                        filterIsNotActive={filterIsNotActive}
                    />
                </div>
            </div>
        </div>
    )
}
export default Projects;