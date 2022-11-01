import React, { memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';

const cName = cn('vacancy-card');

const TITLE = 'Откликнуться';

const JobCard: Props = ({title, description}) => {
    const navigate = useNavigate();

    const passToApply = () => {
        navigate(ROUTES.APPLICATION);
    }

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <div className={cName('text')}>
                        {title}
                    </div>

                    <div className={cName('text')}>
                        {description}
                    </div>
                </div>
            </div>

            <button className={cName('right-block')} onClick={passToApply}>
                {TITLE}
            </button>
        </div>
    )
}

export default memo(JobCard);