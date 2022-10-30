import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { ADMIN, OPTIONS } from '../../consts';
import classnames from 'classnames';
import { Props } from './types';

// import './Options.css';

export const UserCommonInfo: Props = ({data}) => {

    return (
        <div className="user-menu">
            {Object.entries(data).map(([key, value]) => (
                <div
                    key={key}
                    className="user-info-item"
                >
                    {key}: {value}
                </div>
            ))}
        </div>
    );
}

export default memo(UserCommonInfo);