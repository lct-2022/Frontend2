import React, { memo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';
import { applyToJob, getVacancy } from '../../../../api/platform';
import { getTokenFromCookies } from '../../../../utils/cookie';

const cName = cn('vacancy-card');

const APPLY = 'Откликнуться';

const JobCard: Props = ({title, description, id}) => {
    const navigate = useNavigate();

    const makeApply = useCallback(() => {
        applyToJob(id, getTokenFromCookies());
    }, [id]);

    const passToVacancy = useCallback(() => {
        getVacancy(id, getTokenFromCookies());
        navigate(ROUTES.JOB);
    }, [id]);

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <div className={cName('text')} onClick={passToVacancy}>
                        {title}
                    </div>

                    <div className={cName('text')}>
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