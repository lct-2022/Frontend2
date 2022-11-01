import React, { memo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';
import { applyToJob } from '../../../../api/platform';

const cName = cn('vacancy-card');

const TITLE = 'Откликнуться';

const JobCard: Props = ({title, description, id}) => {
    const navigate = useNavigate();

    const makeApply = useCallback(() => {
        applyToJob(id);
    }, [id]);

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

            <button className={cName('right-block')} onClick={makeApply}>
                {TITLE}
            </button>
        </div>
    )
}

export default memo(JobCard);