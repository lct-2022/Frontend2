import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';
import { Nullable } from '../../../../types';

const cName = cn('resume');

const prepareDate = (birthday: string) => {
    return birthday;
}

const prepareText = (gender: Nullable<string>, birthday: Nullable<string>): string => {
    if (!gender || !birthday) {
        return '';
    }
    return `${gender === 'm' ? 'Родился' : 'Родилась'} ${birthday}`
}

const prepareLocationText = (city: Nullable<string>, country: Nullable<string>): string => {
    if (!city || !country) {
        return '';
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

            <p>Resume...</p>
            <p>Resume...</p>
        </div>
    )
}
export default Resume;