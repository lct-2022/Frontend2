
import { cn } from '@bem-react/classname';
import React from 'react';

import './Spinner.css';

const cName = cn('lds-default');

const Spinner = () => {
    return (
        <div className={cName('container')}>
            <div className={cName()}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
};

export default Spinner;