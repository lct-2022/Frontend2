import React, { memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';
import { applyToJob, getJobApplication, getApplications, getVacancy } from '../../../api/platform';
import { getTokenFromCookies, redirectToLogin } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../store/selectors/users';

const cName = cn('vacancy-card');

const APPLY = 'Откликнуться';
const CANCEL = 'Отозвать';

const JobCard: Props = ({title, description, id}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [isApplication, setIsApplication] = useState(false);

    const currentUser = useSelector(currentUserSelector);

    useEffect(() => {
        console.log(id);
        
        getJobApplication(id, getTokenFromCookies())
            .then(data => {
                setIsApplication(!!data);
            })
    }, [id])
    
    const makeApply = useCallback(() => {
        if (!currentUserSelector) {
            redirectToLogin();
            return;
        }
        
        applyToJob(id, getTokenFromCookies())
            .then(result => {
                setIsApplication(!!result)
            })
            .catch(() => {
                throw new Error()
            });
    }, [id, currentUser]);

    const passToVacancy = useCallback(() => {

            dispatch<any>(getCurrentVacancyAction(id))
    
            .then(() => {
                navigate(ROUTES.JOB);
            })
    }, [id]);

    const btn = useMemo(() => {
        return (
            <button className={cName('apply-btn', {applied: isApplication})} onClick={makeApply}>
                {isApplication ? CANCEL : APPLY}
            </button>
        )
    }, [isApplication])

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

            {btn}
        </div>
    )
}

export default memo(JobCard);