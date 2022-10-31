import React, { memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';

import './JobItem.css';

import {Props} from './types';

const TITLE = 'Отправить заявку';

const JobCard: Props = ({title, description}) => {
    const navigate = useNavigate();

    const passToApply = () => {
        navigate(ROUTES.APPLICATION);
    }

    return (
        <div className="card-vacancy-home">
            <div className="card-vacancy-left-block">
                <div className="card-vacancy-photo"/>

                <div className="card-vacancy-data">
                    <div className="card-vacancy-text">
                        {title}
                    </div>

                    <div className="card-vacancy-text">
                        {description}
                    </div>
                </div>
            </div>

            <button className="card-vacancy-right-block" onClick={passToApply}>
                {TITLE}
            </button>
        </div>
    )
}

export default memo(JobCard);