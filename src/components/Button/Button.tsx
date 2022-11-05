import React, { memo } from 'react';
import classname from 'classnames';
import { Props } from './types';

import './Button.css';
import { cn } from '@bem-react/classname';

const cName = cn('btn');

const Button: Props = ({
    children,
    as: Component = 'button',
    ...props
}) => {
    return (
        <Component {...props} className={cName()}>
            {children}
        </Component>
    );
};

export default memo<Props>(Button);