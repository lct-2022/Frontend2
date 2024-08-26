import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {cn} from '@bem-react/classname';

import {getCurrentVacancyAction} from '../../../../store/actions/jobs';
import {Props} from './types';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../../../utils/routes';
import Spinner from '../../../../ui/Spinner';
import Text from '../../../../ui/Text';

import './Vacancies.css';

const cName = cn('vacancies-list')

const TITLE = 'Вакансии';

const VacanciesList: Props = ({vacancies}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)

    const passToVacany = useCallback((id: number) => {
        setLoad(true);
        new Promise(res => res(dispatch<any>(getCurrentVacancyAction(id))))
            .then(() => {
                navigate(ROUTES.JOB);
                setLoad(false);
            })
    }, []);
    
    const vacanciesList = useMemo(() => {
        if (!vacancies || !vacancies.length) {
            return <Text>Открытых вакансий нет</Text>
        }
        return (
            <ul>
                {vacancies.map((vacancy, index) => (
                    <li 
                        key={index}
                        onClick={() => passToVacany(vacancy.id)}
                        className={cName('point')}
                    >
                        {vacancy.title}
                    </li>
                ))}
            </ul>
        )
    }, [vacancies]);

    if (load) {
        return <Spinner/>;
    }

    return (
        <div>
            <h1>{TITLE}</h1>

            {vacanciesList}
        </div>
    )
}
export default memo(VacanciesList);