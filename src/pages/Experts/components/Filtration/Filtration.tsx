import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';

import Card from '../../../../components/Card';
import Text from '../../../../components/Text';
import { Profession, Skill, UserData } from '../../../../types';

import './Filtration.css';

const cName = cn('filter-experts');

type Props = {
    experts: UserData[],
    setExperts: Dispatch<SetStateAction<UserData[]>>;
    professions: Profession[];
    skills: Skill[];
}

const Filtration: FC<Props> = ({setExperts, professions, skills}) => {
    console.log('RENDERRRRR');
    
    const filterProfessions = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setExperts(prev => {
            return prev.map(el => checked && el.profession_id !== Number(value)
                ? {...el, hidden: true} 
                : {...el, hidden: false}   
            );
        });
    }, [setExperts]);

    const professionsCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {professions.map(({id, title}) => (
                    <div key={id}>
                        <label htmlFor={title}>{title}</label>
                        <input name={title} value={id} className={cName('chbx')} type="checkbox" onChange={filterProfessions}/>
                    </div>
                ))}
            </div>
        )
    }, [professions, filterProfessions, setExperts]);

    const filterSkills = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setExperts(prev => {
            return prev.map(el => checked && !el.skill_ids.includes(Number(value))
                ? {...el, hidden: true} 
                : {...el, hidden: false}   
            );
        });
    }, [setExperts]);

    const skillsCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {skills.map(({id, title}) => (
                    <div key={id}>
                        <label htmlFor={title}>{title}</label>
                        <input name={title} value={id} className={cName('chbx')} type="checkbox" onChange={filterSkills}/>
                    </div>
                ))}
            </div>
        )
    }, [skills, filterSkills, setExperts]);

    return (
        <Card className={cName()}>
            <div className={cName('block')}>
                <Text className={cName('field-title')}>Статус</Text>
                {professionsCriterias}
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Категория инноваций</Text>
                {skillsCriterias}
            </div>
        </Card>
    )
}
export default Filtration;