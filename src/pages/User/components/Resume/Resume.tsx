import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from './types';
import { Nullable } from '../../../../types';
import Text from '../../../../components/Text';

const cName = cn('resume');

const prepareDate = (birthday: string) => {
    return birthday;
}

const prepareText = (gender: Nullable<string>, birthday: Nullable<string>): string => {
    if (!gender || !birthday) {
        return 'Родился';
    }
    return `${gender === 'm' || gender === 'M' ? 'Родился' : 'Родилась'} ${birthday}`
}

const prepareLocationText = (city: Nullable<string>, country: Nullable<string>): string => {
    if (!city || !country) {
        return 'Живет в России, городе Москва';
    }
    return `Живет в ${country}, городе ${city}`
}


const Resume: Props = ({user}) => {

    const {gender, birthday, city, country} = user;

    const birhtText = useMemo(() => {
        return (
            <p>{prepareText(gender, birthday)}</p>
        )
    }, [gender, birthday]);

    const locationText = useMemo(() => {
        return (
            <p>{prepareLocationText(city, country)}</p>
        )
    }, [gender, birthday]);

    return (
        <div className={cName()}>

            {birhtText}
            {locationText}
            {user.about}
            
            <div className={cName('data')}>
                <h5>Образование:</h5>
                <Text>{user.education}</Text>
                
                <h5>Навыки:</h5>
                <ul>
                    {user.skill_ids.map(el => {
                        return (
                            <li key={el}>
                                el
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Text>Resume...</Text>
        </div>
    )
}
export default Resume;