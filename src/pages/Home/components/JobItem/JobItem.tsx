import React, { memo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';
import { applyToJob, getVacancy } from '../../../../api/platform';
import { getTokenFromCookies } from '../../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../../store/selectors/activeUser';

const cName = cn('vacancy-card');

const APPLY = 'Откликнуться';

const JobCard: Props = ({title, description, id}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector(currentUserSelector)

    const makeApply = useCallback(() => {
        if (!currentUserSelector) {
            navigate(ROUTES.LOGIN);
            return;
        }
        
        applyToJob(id, getTokenFromCookies())
            .then(() => {
                navigate(ROUTES.APPLICATION);
            })
            .catch(() => {
                throw new Error()
            });
    }, [id, currentUser]);

    const passToVacancy = useCallback(() => {
        dispatch<any>(getCurrentVacancyAction(id));
        getVacancy(id, getTokenFromCookies());
        navigate(ROUTES.JOB);
    }, [id]);

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <div className={cName('text', {title: true})} onClick={passToVacancy}>
                        {title}
                    </div>

                    <div className={cName('text', {description: true})}>
                        {description}
                    </div>
                </div>
            </div>

            <button className={cName('right-block')} onClick={makeApply}>
                {APPLY}
            </button>
        </div>
    )
}

export default memo(JobCard);