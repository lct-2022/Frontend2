import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { parseStringForDiapazon } from '../../../../utils/parse';
import { Props } from './types';
import Card from '../../../../components/Card';
import Text from '../../../../components/Text';
import { NAIM, STATUSES, TAGS, TEAM_SIZES } from '../../consts';

import './Filtration.css';

const cName = cn('project-filters');

const ProjectFilters: Props = ({setProjects, industries, innovationTypes}) => {
    const filterIndustries = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && project.industry !== value
                ? {...project, hidden: true} 
                : {...project, hidden: false}    
            );
        });
    }, [setProjects]);

    const industriesCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {industries.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterIndustries}/>
                    </div>
                ))}
            </div>
        )
    }, [industries, filterIndustries]);

    const filterInnivationTypes = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && project.innovation_type !== value
                ? {...project, hidden: true} 
                : {...project, hidden: false}    
            );
        });
    }, [setProjects]);

    const innovationTypesCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {innovationTypes.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterInnivationTypes}/>
                    </div>
                ))}
            </div>
        )
    }, [innovationTypes, filterInnivationTypes]);

    const filterTags = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && 
                (project.innovations.includes(value) 
                || project.description.includes(value) 
                || project.title.includes(value)
                || project.industry.includes(value))
                    ? {...project, hidden: false} 
                    : {...project, hidden: true}    
            );
        });
    }, [setProjects]);

    const tagsCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {TAGS.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterTags}/>
                    </div>
                ))}
            </div>
        )
    }, [filterTags]);

    const filterIsActive = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            if (value === NAIM) {
                return prev.map(project => checked && project.jobs?.length
                    ? {...project, hidden: false} 
                    : {...project, hidden: true}    
                );   
            } else {
                return prev.map(project => checked && project.jobs?.length
                    ? {...project, hidden: true} 
                    : {...project, hidden: false}    
                ); 
            }
        });
    }, [setProjects]);

    const isActiveCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {STATUSES.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterIsActive}/>
                    </div>
                ))}
            </div>
        )
    }, [filterIsActive]);

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

    const teamSizeCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {TEAM_SIZES.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} type="checkbox" onChange={filterTeamSize}/>
                    </div>
                ))}
            </div>
        )
    }, [filterTeamSize]);
    
    return (
        <Card className={cName()}>
            <div className={cName('block')}>
                <Text className={cName('field-title')}>Статус</Text>
                {isActiveCriterias}
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Категория инноваций</Text>
                {innovationTypesCriterias}
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Индустрия</Text>
                {industriesCriterias}
            </div>     

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Размер команды</Text>
                {teamSizeCriterias}
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Теги</Text>
                {tagsCriterias}
            </div>
        </Card>
    )
}

export default ProjectFilters;