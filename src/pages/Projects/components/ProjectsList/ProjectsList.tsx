import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';

import ProjectCard from '../../../../ui/CommonBlocks/ProjectItem';
import { Props } from '../../types';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../../utils/routes';
import { getAllProjects } from '../../../../api/platform';
import Button from '../../../../ui/Button';
import { LIMITS } from '../../../../utils/consts';
import Spinner from '../../../../ui/Spinner';
import { Empty } from '../../../../types/common';

import './ProjectsList.css';

const cName = cn('projects-list');

const ProjectsList: Props = ({projects, setNewProjects}) => {
    const location = useLocation();

    const [criteria, setCriteria] = useState('');
    const [pageKey, setPageKey] = useState<Empty<string>>();
    const [isLoading, setIsLoading] = useState(false);

    const isFromProfile = location.pathname === ROUTES.USER;
    const allHidden = projects.filter(project => !project.hidden).length === 0;
    const allMiss = !projects.length;

    const changeCriteria = (event: ChangeEvent<HTMLInputElement>) => {
        setCriteria(event.target.value);
    }

    const projectsList = useMemo(() => {
        if ((allMiss || allHidden) && !isFromProfile) {
            return (
                <h3>Проектов, удовлетворяющих заданным условиям, нет</h3>
            )
        }

        if (allMiss && isFromProfile) {
            return (
                <h3>У Вас пока нет проектов</h3>
            )
        }

        return (
            <div className={cName('container')}>
                {projects?.map(({title, description, industry, id, hidden}) => (
                    <div key={id} className={cName('project', {hidden})}>
                        <ProjectCard
                            title={title}
                            description={description}
                            industry={industry}
                            id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [projects, isFromProfile, allMiss, allHidden]);
    
    const search = useCallback(() => {
        setIsLoading(true);

        getAllProjects(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setNewProjects(data?.items || []);
                setPageKey(data?.next_page_key);
                setCriteria('');
                setIsLoading(false);

            })
    }, [criteria]);

    const showMore = useCallback(() => {
        setIsLoading(true);

        getAllProjects(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setNewProjects(data?.items.map(project => ({...project, hidden: false})) || []);
                setPageKey(data?.next_page_key);
                setIsLoading(false);
            })
    }, [criteria, pageKey]);

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className={cName()}>
            <div className={cName('search')}>
                <input type="text" value={criteria} placeholder="Найти проект" onChange={changeCriteria} className={cName('search-input')}/>

                <Button onClick={search}>
                    {allHidden || allMiss ? 'Показать все' : 'Найти'}
                </Button>
            </div>

            {projectsList}

            {!allHidden && !allMiss &&
                <Button className={cName('show-more-btn')} onClick={showMore}>
                    Показать еще 
                </Button>  
            }   
        </div>
    )
}
export default ProjectsList;