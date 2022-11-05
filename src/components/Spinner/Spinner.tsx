
import { cn } from '@bem-react/classname';
import React from 'react';

import './Spinner.css';

const cName = cn('spinner');

const Spinner = () => {
    return (
        <div className={cName('container')}>
            <div className={cName()}/>
        </div>
    );
};

export default Spinner;