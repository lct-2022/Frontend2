import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { OPTIONS, UserOption} from '../../consts';
import {cn} from '@bem-react/classname';
import {Props} from './types';
import './Options.css';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../../store/selectors/users';

const cName = cn('user-options');

export const UserOptions: Props = ({currentOption, setOptions}) => {
    const activeUser = useSelector(authUserSelector);

    return (
        <div className={cName()}>
            {Object.entries(OPTIONS).map(([key, point], index) => (
                <p
                    key={index}
                    onClick={() => setOptions(key as UserOption)}
                    className={cName('point', {
                        current: key === currentOption,
                    })}
                >
                    {point}
                </p>
            ))}
        </div>
    );
}

export default memo(UserOptions);