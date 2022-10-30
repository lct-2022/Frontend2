import React, { memo} from 'react';

import './JobItem.css';

import {Props} from './types';

const TITLE = 'Отправить заявку';

const JobCard: Props = ({title, description}) => {
    return (
        <div>
            <div className="card-job-left-block">
                {title}
                {description}
            </div>

            <button className="card-job-right-block">
                {TITLE}
            </button>
        </div>
    )
}

export default memo(JobCard);