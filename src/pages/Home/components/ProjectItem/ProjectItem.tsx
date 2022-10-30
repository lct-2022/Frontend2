import React, { memo} from 'react';

import './JobItem.css';

import {Props} from './types';

const TITLE = 'Отправить заявку';

const ProjectItem: Props = ({
    title, 
    description,
    contest,
    url,
    rating,
}) => {
    return (
        <div className="card-project-home">
            <div className="card-project-left-block">
                <div className="card-project-photo"/>

                <div className="card-project-data">
                    <div className="card-project-text">
                        {title}
                    </div>

                    <div className="card-project-text">
                        {description}
                    </div>
                </div>
            </div>

            <button className="card-project-right-block">
                {TITLE}
            </button>
        </div>
    )
}

export default memo(ProjectItem);