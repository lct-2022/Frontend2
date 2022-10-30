import React, { memo } from 'react';
import classname from 'classnames';
import { Props } from './types';

import './Button.css';

const Button: Props = ({
    children,
    as: Component = 'button',
    type = 'ordinary',
    ...props
}) => {
    return (
        <Component {...props} className={classname('btn', `btn-${type}`)}>
            {children}
        </Component>
    );
};

export default memo<Props>(Button);