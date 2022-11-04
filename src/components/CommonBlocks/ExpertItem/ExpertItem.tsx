import React, { memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'
import {Props} from './types';
import { applyToJob, getJobApplication, getApplications, getVacancy } from '../../../api/platform';
import { getTokenFromCookies } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../store/selectors/users';
import { DEFAULT_AVATAR } from '../../../utils/consts';
import { getUserProfileAction } from '../../../store/actions/users';
import { getUserProfile } from '../../../api/passport';
import './ExpertItem.css';

const cName = cn('expert-card');

const ExpertCard: Props = ({user, rating, canBeInvited}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {fio, job, id} = user;

    const passToProfile = useCallback(() => {
        // dispatch(getUserProfileAction());
        getUserProfile({projects: true}, id)
            .then(() => {
                dispatch(getUserProfileAction(user));
                navigate(`${ROUTES.USER}/search`);
            })
    }, [id]);

    return (
        <div className={cName()}>
            <img src={DEFAULT_AVATAR} alt="Аватар" className={cName('avatar')}/>

            <div className={cName('data')}>
                <div className={cName('fio')} onClick={() => {}}>{fio}</div>
                <div className={cName('job')}>{job}</div>
                <div className={cName('rate')}>rate:&nbsp;{rating}</div>
            </div>

            {/* Уведомления потом */}
            {canBeInvited && 
                <div>
                    <button>Пригласить в команду</button>
                    <button onClick={passToProfile}>Посмотреть профиль</button>
                </div>
            }
        </div>
    )
}

export default memo(ExpertCard);