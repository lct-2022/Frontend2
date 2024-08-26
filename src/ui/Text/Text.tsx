import React, { memo } from 'react';
import { cn } from '@bem-react/classname';

import {Props} from './types';

import './Text.css';

const cName = cn('text');

const Text: Props = ({
    children,
    className,
    type = 'ordinary',
    ...props
}) => {
    return (
        <p {...props} className={cName({type}, [className])}>
            {children}
        </p>
    );
};

export default memo<Props>(Text);