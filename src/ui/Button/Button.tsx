import React, { memo } from 'react';
import { cn } from '@bem-react/classname';

import { Props } from './types';

import './Button.css';

const cName = cn('btn');

const Button: Props = ({
    children,
    className,
    as: Component = 'button',
    ...props
}) => {
    return (
        <Component {...props} className={cName({}, [className])}>
            {children}
        </Component>
    );
};

export default memo<Props>(Button);