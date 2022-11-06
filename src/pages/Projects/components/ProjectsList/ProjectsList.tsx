import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';
import { Props } from '../../types';
import { cn } from '@bem-react/classname';

import './ProjectsList.css';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../../utils/routes';

import Card from '../../../../components/Card';
import Text from '../../../../components/Text';
import { getAllProjects } from '../../../../api/platform';

import './ProjectsList.css';

const cName = cn('projects-list')

const ProjectsList: Props = ({projects, setProjects}) => {
    const location = useLocation();

    const [criteria, setCriteria] = useState('');
    const [projectss, setProjectss] = useState(projects);
    const [pageKey, setPageKey] = useState<string | undefined>();


    const isFromProfile = location.pathname === ROUTES.USER;

    const changeCriteria = (event: ChangeEvent<HTMLInputElement>) => {
        setCriteria(event.target.value);
    }

    const projectsList = useMemo(() => {
        if (!projects.length) {
            return (
                <h3>{isFromProfile ? 'У Вас пока нет проектов' : 'На текущий момент проектов нет'}</h3>
            )
        }

        if (projects.filter(project => !project.hidden).length === 0) {
            return (
                <h3>Проектов, удовлетворяющих заданным условиям, нет</h3>
            )
        }
        
        if (!projects) {
            return null;
        }

        return (
            <div className={cName('container')}>
                {projects?.map(({title, description, industry, id, hidden}, index) => (
                    <div key={index} className={cName('project', {hidden})}>
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
    }, [projects]);
    
    const search = useCallback(() => {
        getAllProjects(criteria || '*')
            .then(data => {
                setProjects(data?.items || []);
                setPageKey(data?.next_page_key);
            })
        setCriteria('');
    }, [criteria]);

    return (
        <div>
            {/* <h1>{isFromProfile ? 'Ваши проекты:' : 'Проекты'}</h1> */}
            {/* <Card as="input"></Card> */}
            <div className={cName('search')}>
                <input type="text" value={criteria} placeholder="Найти проект" onChange={changeCriteria} className={cName('search-input')}/>

                <button onClick={search}>
                    Найти
                </button>
            </div>

            {/* <Card className={cName('search')}> */}
            {/* </Card> */}

            {projectsList}
        </div>
    )
}
export default ProjectsList;