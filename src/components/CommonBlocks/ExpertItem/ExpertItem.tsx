import React, { memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'
import {Props} from './types';
import { applyToJob, getJobApplication, getProjectVacancies, getVacancy } from '../../../api/platform';
import { getTokenFromCookies } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../store/selectors/users';
import { DEFAULT_AVATAR } from '../../../utils/consts';
import './ExpertItem.css';

const cName = cn('expert-card');

const ExpertCard: Props = ({fio, job, rating, id}) => {
    console.log(fio);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={cName()}>
            <img src={DEFAULT_AVATAR} alt="Аватар" className={cName('avatar')}/>

            <div className={cName('data')}>
                <div className={cName('fio')} onClick={() => {}}>{fio}</div>
                <div className={cName('job')}>{job}</div>
                <div className={cName('rate')}>rate:&nbsp;{rating}</div>
            </div>
        </div>
    )
}

export default memo(ExpertCard);