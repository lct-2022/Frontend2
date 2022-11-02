import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import {ADMIN_OPTION, OPTIONS, UserOption} from '../../consts';
import {cn} from '@bem-react/classname';
import {Props} from './types';
import './Options.css';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../../store/selectors/users';

const cName = cn('user-options');

export const UserOptions: Props = ({currentOption, setOptions}) => {
    const currentUser = useSelector(currentUserSelector);

    const newOptions = !currentUser?.admin
        ? Object.assign({}, OPTIONS, ADMIN_OPTION)
        : {...OPTIONS}

    return (
        <div className={cName()}>
            {Object.entries(newOptions).map(([key, point], index) => (
                <p
                    key={index}
                    onClick={() => setOptions(key as UserOption)}
                    className={cName('point', {
                        current: key === currentOption,
                        admin: point === ADMIN_OPTION.admin,
                    })}
                >
                    {point}
                </p>
            ))}
        </div>
    );
}

export default memo(UserOptions);