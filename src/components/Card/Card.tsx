import React, { Children, ElementType, HTMLAttributes, memo } from 'react';
import { cn } from '@bem-react/classname';
import {Props} from './types'
import './Card.css';

const cName = cn('card');

const Card: Props = ({
    children,
    as: Component = 'div', 
    ...props
}) => {
    return (
        <Component {...props}>
            {children}
        </Component>
    );
};

export default memo<Props>(Card);