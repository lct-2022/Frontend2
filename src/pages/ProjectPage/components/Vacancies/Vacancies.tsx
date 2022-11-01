import React, { memo, useMemo } from 'react';

import {cn} from '@bem-react/classname';
import {Props} from './types';
import './Vacancies.css';

const cName = cn('main')

const TITLE = 'Вакансии'

const VacanciesList: Props = ({vacancies}) => {
    const vacanciesList = useMemo(() => {
        return (
            <ul>
                {vacancies.map((vacancy, index) => (
                    <li key={index}>
                        {vacancy.id}
                    </li>
                ))}
            </ul>
        )
    }, [vacancies]);

    return (
        <div>
            <h1>{TITLE}</h1>

            {vacanciesList}
        </div>
    )
}
export default memo(VacanciesList);