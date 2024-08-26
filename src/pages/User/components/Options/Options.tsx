import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { OPTIONS, UserOption} from '../../consts';
import {cn} from '@bem-react/classname';
import {Props} from './types';

import Text from '../../../../ui/Text';

import './Options.css';

const cName = cn('user-options');

export const UserOptions: Props = ({currentOption, setOptions}) => {
    return (
        <div className={cName()}>
            {Object.entries(OPTIONS).map(([key, point], index) => (
                <div 
                    key={index}
                    onClick={() => setOptions(key as UserOption)}
                    className={cName('point')}
                >
                    <Text
                        type="bold"
                    >
                        {point}
                    </Text>
                    {key === currentOption && <div className={cName('line')}/>}
                </div>
            ))}
        </div>
    );
}

export default memo(UserOptions);