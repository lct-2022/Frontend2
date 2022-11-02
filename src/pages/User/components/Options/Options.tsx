import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { ADMIN, OPTIONS, UserOption } from '../../consts';
import {cn} from '@bem-react/classname';
import {Props} from './types';
import './Options.css';

const cName = cn('user-options');

export const UserOptions: Props = ({curentOption, setOptions}) => {

    return (
        <div className={cName()}>
            {Object.entries(OPTIONS).map(([key, point], index) => (
                <div
                    key={index}
                    onClick={() => setOptions(key as UserOption)}
                    className={cName('point', {
                        current: key === curentOption,
                        admin: point === ADMIN,
                    })}
                >
                    {point}
                </div>
            ))}
        </div>
    );
}

export default memo(UserOptions);