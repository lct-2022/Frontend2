import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { ADMIN, OPTIONS } from '../../consts';
import {cn} from '@bem-react/classname';

import './Options.css';

const cName = cn('user-options');

export function UserOptions() {
    return (
        <div className={cName()}>
            {[...OPTIONS].map((point, index) => (
                <div
                    key={index}
                    className={cName('point', {admin: point === ADMIN})}
                >
                    {point}
                </div>
            ))}
        </div>
    );
}

export default memo(UserOptions);