import React, { memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';
import { applyToJob, getJobApplication, cancelApplication } from '../../../api/platform';
import { getTokenFromCookies } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../store/selectors/users';
import Button from '../../Button';
import Spinner from '../../Spinner';

const cName = cn('vacancy-card');

const APPLY = 'Откликнуться';
const CANCEL = 'Отозвать';
const APPLICATION_WARNING = 'Чтобы откликнуться на вакансию, войдите или зарегистируйтесь';
const APPLICATION_ERROR = 'Не удалось откликнуться/отменить отклик, пожалуйста, попробуйте позже'

const JobCard: Props = ({title, description, application, id}) => {
    const authUser = useSelector(authUserSelector);
    const [isApplication, setIsApplication] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getJobApplication(id, getTokenFromCookies())
            .then(data => {                
                setIsApplication(!!data);
            })
    }, []);
    
    const makeApplication = useCallback(() => {       
        if (!authUser) {
            alert(APPLICATION_WARNING)
            return;
        }

        const applicationRequestor = !isApplication
            ? applyToJob(id)
            : cancelApplication(application?.id || 0)
        
        applicationRequestor
            .then(result => {
                setIsApplication(!!result)
            })
            .catch(() => {
                throw new Error(APPLICATION_ERROR)
            });
    }, [id, application?.id, authUser, isApplication]);

    const passToVacancy = () => {
        setIsLoading(true);

        new Promise(res => res(dispatch<any>(getCurrentVacancyAction(id)))) 
            .then(() => {
                navigate(ROUTES.JOB);
                setIsLoading(false);
            })
    };

    if (isLoading) {
        return <Spinner/>
    }

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

            <Button className={cName('apply-btn', {applied: isApplication})} onClick={makeApplication}>
                {isApplication ? CANCEL : APPLY}
            </Button>
        </div>
    )
}

export default memo(JobCard);