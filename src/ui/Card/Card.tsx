import React, { memo } from 'react';
import { cn } from '@bem-react/classname';

import {Props} from './types'

import './Card.css';

const cName = cn('card');

const Card: Props = ({
    children,
    as: Component = 'div', 
    withoutFrame = false,
    className,
    ...props
}) => {
    return (
        <Component {...props} className={cName({without_frame: withoutFrame}, [className])}>
            {children}
        </Component>
    );
};

export default memo<Props>(Card);