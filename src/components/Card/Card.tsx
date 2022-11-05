import React, { memo } from 'react';
import { cn } from '@bem-react/classname';
import {Props} from './types'
import './Card.css';

const cName = cn('card');

const Card: Props = ({
    children,
    as: Component = 'div', 
    withFrame = true,
    ...props
}) => {
    return (
        <Component {...props} className={cName({frame: withFrame})}>
            {children}
        </Component>
    );
};

export default memo<Props>(Card);