import React, { ChangeEvent, useCallback } from 'react';
import { parseStringForDiapazon } from '../../../../utils/parse';
import { Props } from './types';

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
        <div>
            <h3>ProjectFilters</h3>
            
            <div>
                <h5>Размер команды</h5>

                <div>
                    <label htmlFor="input-chbx-team-size">1-5</label>
                    <input className="input-chbx-team-size" value="1-5" type="checkbox" onChange={filterByLimitsProject}/>
                </div>

                <div>
                    <label htmlFor="input-chbx-team-size">6-10</label>
                    <input className="input-chbx-team-size" value="6-10" type="checkbox" onChange={filterByLimitsProject}/>
                </div>

                <div>
                    <label htmlFor="input-chbx-team-size">11-20</label>
                    <input className="input-chbx-team-size" value="11-20" type="checkbox" onChange={filterByLimitsProject}/>
                </div>

                <div>
                    <label htmlFor="input-chbx-team-size">20+</label>
                    <input className="input-chbx-team-size" value="20+" type="checkbox" onChange={filterByLimitsProject}/>
                </div>
            </div>

            <div>
                <h5>Рейтинг</h5>

                <div>
                    <label htmlFor="input-chbx-team-size">1+</label>
                    <input className="input-chbx-team-size" value="1+" type="checkbox" onChange={filterByLimitsRating}/>
                </div>

            </div>
            
        </div>
    )
}
export default ProjectFilters;