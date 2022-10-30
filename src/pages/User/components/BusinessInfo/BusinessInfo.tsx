import React, {memo, FC, useMemo } from 'react';
import classnames from 'classnames';

import './BusinessInfo.css';
import { Props } from './types';
import { BUSINESS_INFO } from '../../consts';

export const BusinesInfo: Props = ({fio}) => {
    const userBusinessData = useMemo(() => {
        return (
            <div className="user-business-profile-left">
                <img 
                    src="" 
                    alt="" 
                    className="user-avatar"
                />

                <div>
                    {[...BUSINESS_INFO, fio].map((point, index) => (
                        <div key={index}>
                            {point}
                        </div>
                    ))}
                </div>
            </div>
        )
    }, []);

    return (
        <div className="user-business-data">
            {userBusinessData}

            {/* <div className="user-rating">
                // Rating
            </div> */}
        </div>
    );
}

export default memo(BusinesInfo);