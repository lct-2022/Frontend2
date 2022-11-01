import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { ADMIN, OPTIONS } from '../../consts';
import classnames from 'classnames';

import './Options.css';

export function UserOptions() {
    console.log(OPTIONS);
    
    return (
        <div className="user-menu">
            {[...OPTIONS].map((point, index) => (
                <div
                    key={index}
                    className={classnames('user-menu-point', {
                        'admin-point': point === ADMIN,
                    })}
                >
                    {point}
                </div>
            ))}
        </div>
    );
}

export default memo(UserOptions);