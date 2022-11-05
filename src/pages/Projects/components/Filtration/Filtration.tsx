import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { parseStringForDiapazon } from '../../../../utils/parse';
import { Props } from './types';
import Card from '../../../../components/Card';
import Text from '../../../../components/Text';

import './Filtration.css';

const cName = cn('project-filters');

const TEAM_SIZES = [
    '1-5',
    '6-10',
    '11-20',
    '20+',
];

const STATUS = [
    '1-5',
    '6-10',
    '11-20',
    '20+',
];

const ProjectFilters: Props = ({projects, setProjects, industries, innovationTypes}) => {
    const filterByTeamSize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(value);
            
            return prev.map(project => checked && ((project.test || 0) <= min || (project.test || 0) >= max)
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
    const industriesCriterias = useMemo(() => {
        const filterIndustries = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            const {value, checked} = event.target;

            setProjects(prev => {
                return prev.map(project => checked && project.industry !== value
                    ? {...project, hidden: true} 
                    : {...project, hidden: false}    
                );
            });
        }, [setProjects]);

        return (
            <div>
                {industries.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterIndustries}/>
                    </div>
                ))}
            </div>
        )
    }, [industries, setProjects]);

    const innovationTypesCriterias = useMemo(() => {
        const filterInnivationTypes = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            const {value, checked} = event.target;

            setProjects(prev => {
                return prev.map(project => checked && project.innovation_type !== value
                    ? {...project, hidden: true} 
                    : {...project, hidden: false}    
                );
            });
        }, [setProjects]);

        return (
            <div>
                {innovationTypes.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterInnivationTypes}/>
                    </div>
                ))}
            </div>
        )
    }, [innovationTypes, setProjects]);
    
    return (
        <Card className={cName()}>
            <div className={cName('block')}>
                <Text className={cName('field-title')}>Статус</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Активен" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">Активен</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">Закрыт</label>
                    </div>
                </div>
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Категория</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Активен" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">Инновационная</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">Неинновационная</label>
                    </div>
                </div>
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Индустрия</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Активен" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">Дизайн</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">В2В Сервисы</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="Закрыт" type="checkbox" onChange={filterInnovative}/>
                        <label htmlFor="box">Образование</label>
                    </div>
                </div>
            </div>     

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Размер команды</Text>

                <div className={cName('boxes')}>
                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="1-5" type="checkbox" onChange={filterByTeamSize}/>
                        <label htmlFor="box">1-5</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="6-10" type="checkbox" onChange={filterByTeamSize}/>
                        <label htmlFor="box">6-10</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="11-20" type="checkbox" onChange={filterByTeamSize}/>
                        <label htmlFor="box">11-20</label>
                    </div>

                    <div className={cName('field')}>
                        <input className={cName('box')} name="box" value="20+" type="checkbox" onChange={filterByTeamSize}/>
                        <label htmlFor="box">20+</label>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default ProjectFilters;