import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useQuery} from 'react-query';
import { cn } from "@bem-react/classname";
import Spinner from "../Spinner";
import { getSkills } from "../../api/platform";
import Text from "../Text";

import './Skills.css';

const cName = cn('edit-skills');

interface IProps {
    title: string;
}

const Skills: FC<IProps> = ({title}) => {
    const {data, isLoading, error} = useQuery('skills', () => getSkills());

    const [skills, setSkills] = useState<{name: string, selected: boolean, id: number}[]>([]);

    useEffect(() => {
        data && setSkills(data.map(el => ({name: el.title, selected: false, id: el.id})));
    }, [data]);

    const changeSkills = useCallback((name: string) => {
        setSkills(prev => prev.map(el => el.name === name ? {...el, selected: !el.selected} : el));
    }, []);

    if (error) throw new Error('Failed to get skills');

    if(isLoading) return <Spinner/>

    if (!data) return null;

    return (
        <>
            <Text>{title}</Text>

            <div className={cName('skills')}>
                {skills?.map(({id, name}) => (
                    <div key={id} className={cName('skills-block')}>
                        <label htmlFor={name}>{name}</label>

                        <input name={name} value={name} className={cName('chbx')} type="checkbox" onChange={() => {changeSkills(name)}}/>
                    </div>    
                ))}
            </div>
        </>
    )    
}

export default memo(Skills);