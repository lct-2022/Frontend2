import React from 'react';
import classname from 'classnames';

import './Button.css';
import { Props } from './types';

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

export default Button;