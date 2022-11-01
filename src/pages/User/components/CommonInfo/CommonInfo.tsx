import React, { useState, ChangeEvent, useCallback, useEffect, memo } from 'react';
import { ADMIN, OPTIONS } from '../../consts';
import classnames from 'classnames';
import { Props } from './types';

import './CommonInfo.css';

import {cn} from '@bem-react/classname';

const cName = cn('user-common-info');

export const UserCommonInfo: Props = ({data}) => {

    return (
        <div className={cName()}>
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