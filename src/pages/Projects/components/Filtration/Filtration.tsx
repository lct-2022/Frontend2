import React, { ChangeEvent, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { parseStringForDiapazon } from '../../../../utils/parse';
import { Props } from './types';
import Card from '../../../../components/Card';
import Text from '../../../../components/Text';

import './Filtration.css';

const cName = cn('project-filters');

const ProjectFilters: Props = ({projects, setProjects}) => {
    const filterByteamSize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(value);
            
            return prev.map(project => checked && (project.id <= min || project.id >= max)
                ? {...project, hidden: true} 
                : {...project, hidden: false}    
            );
        });
    }, [setProjects]);

    // ----- //
    const filterInnovative = useCallback(() => {
        setProjects(prev => {
            return prev.map(project => project.innovations === 'innovative'
                ? {...project, hidden: false} 
                : project   
            );
        });
    }, [setProjects]);

    const filterNonInnovative = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(event.target.value);
            return prev.map(project => project.id <= min && project.id >= max 
                ? {...project, hidden: false} 
                : project   
            );
        });
    }, [setProjects]);

    // ----- //

    
    return (
        <Card className={cName()}> 
            <div className={cName('block')}>
                <Text className={cName('field-title')}>Статус</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Активен" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">Активен</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">Закрыт</label>
                    </div>
                </div>
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Категория</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Активен" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">Инновационная</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">Неинновационная</label>
                    </div>
                </div>
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Индустрия</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Активен" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">Дизайн</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">В2В Сервисы</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterByLimitsRating}/>
                        <label htmlFor="box">Образование</label>
                    </div>
                </div>
            </div>     

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Размер команды</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="1-5" type="checkbox" onChange={filterByteamSize}/>
                        <label htmlFor="box">1-5</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="6-10" type="checkbox" onChange={filterByteamSize}/>
                        <label htmlFor="box">6-10</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="11-20" type="checkbox" onChange={filterByteamSize}/>
                        <label htmlFor="box">11-20</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="20+" type="checkbox" onChange={filterByteamSize}/>
                        <label htmlFor="box">20+</label>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default ProjectFilters;