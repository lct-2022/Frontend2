import React, { memo} from 'react';

import './ProjectItem.css';

import {Props} from './types';

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

                <div className="card-project-detailes">
                    <span>{contest}</span>
                    <span>{url}</span>
                </div>
            </div>

            <div className="card-project-rating">
                {rating}
            </div>
        </div>
    )
}

export default memo(ProjectItem);