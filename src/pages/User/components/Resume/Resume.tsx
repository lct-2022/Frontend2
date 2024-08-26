import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {cn} from '@bem-react/classname';
import { Props } from './types';
import { Nullable } from '../../../../types/common';
import Text from '../../../../ui/Text';
import { prepareDate } from '../../../../utils/grammar';

import { ROUTES } from '../../../../utils/routes';
import './Resume.css';

const cName = cn('resume');

const prepareText = (gender: Nullable<string>, birthday: Nullable<string>): string => {
    if (!gender || !birthday) {
        return 'Не заполнено';
    }
    return `${gender === 'М' ? 'Родился' : 'Родилась'} ${prepareDate(birthday)}`
}

const prepareLocationText = (city: Nullable<string>, country: Nullable<string>): string => {
    if (!city || !country) {
        return 'Живет в России, городе Москва';
    }
    return `Живет в ${country}, городе ${city}`
}

const Resume: Props = ({user}) => {
    const navigate = useNavigate();
    const params = useParams();
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

    const passToEdit = () => {
        navigate(ROUTES.USER_EDIT)
    }

    return (
        <div className={cName()}>
            <div className={cName('personal-info')}>
                <div className={cName('personal-info-header')}>
                    <Text className={cName('header')}>Личная информация</Text>
                    {!params.search && <Text type="light" onClick={passToEdit} className={cName('edit')}>Редактировать</Text>}
                </div>
                {user.fio}
                {birhtText}
                {locationText}
            </div>

            <div className={cName('education')}>
                <div className={cName('education-header')}>
                    <Text className={cName('header')}>Образование</Text>
                    {!params.search && <Text type="light" onClick={passToEdit} className={cName('edit')}>Редактировать</Text>}
                </div>
                <Text>{user.education}</Text>
            </div>

            <div className={cName('skills')}>
                <Text className={cName('header')}>Навыки:</Text>
                <ul>
                    {user.skills.map((skill, index) => {
                        return (
                            <li key={index}>
                                {skill}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default Resume;