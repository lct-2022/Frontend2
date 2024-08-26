import React, { memo} from 'react';

import './JobItem.css';

import {Props} from './types';


const EventItem: Props = ({
    title, 
    description,
}) => {
    return (
        <div className="card-event-home">
            <div className="card-event-left-block">
                <div className="card-event-photo"/>

                <div className="card-event-data">
                    <div className="card-event-text">
                        {title}
                    </div>

                    <div className="card-event-text">
                        {description}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EventItem;