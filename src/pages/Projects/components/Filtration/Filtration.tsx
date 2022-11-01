import React, { ChangeEvent, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { parseStringForDiapazon } from '../../../../utils/parse';
import { Props } from './types';

import './Filtration.css';

const cName = cn('project-filters');

const ProjectFilters: Props = ({projects, setProjects}) => {
    const min = 1
    const max = 5
    const filterByLimitsProject = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(value);
            console.log(checked, min, max);
            console.log(prev.map(el => el.project.id))
            
            return prev.map(project => checked && (project.project.id <= min || project.project.id >= max)
                ? {...project, hidden: true} 
                : {...project, hidden: false}    
            );
        });
    }, [setProjects]);

    const filterByLimitsRating = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(event.target.value);
            return prev.map(project => project.rating <= min && project.rating >= max 
                ? {...project, hidden: false} 
                : project   
            );
        });
    }, [setProjects]);

    console.log(projects);
    
    return (
        <div className={cName()}>
            <h3>ProjectFilters</h3>
            
            <div className={cName('block')}>
                <h5 className={cName('field-title')}>Размер команды</h5>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className="input-chbx-team-size" value="1-5" type="checkbox" onChange={filterByLimitsProject}/>
                        <label htmlFor="input-chbx-team-size">1-5</label>
                    </div>

                    <div className={cName('field')}>
                        <input className="input-chbx-team-size" value="6-10" type="checkbox" onChange={filterByLimitsProject}/>
                        <label htmlFor="input-chbx-team-size">6-10</label>
                    </div>

                    <div className={cName('field')}>
                        <input className="input-chbx-team-size" value="11-20" type="checkbox" onChange={filterByLimitsProject}/>
                        <label htmlFor="input-chbx-team-size">11-20</label>
                    </div>

                    <div className={cName('field')}>
                        <input className="input-chbx-team-size" value="20+" type="checkbox" onChange={filterByLimitsProject}/>
                        <label htmlFor="input-chbx-team-size">20+</label>
                    </div>
                </div>
            </div>
            <div>
                <h5 className={cName('field-title')}>Рейтинг</h5>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className="input-chbx-team-size" value="1+" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="input-chbx-team-size">1+</label>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ProjectFilters;