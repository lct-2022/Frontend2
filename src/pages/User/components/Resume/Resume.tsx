import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

const cName = cn('resume')

const Resume = () => {
    return (
        <div className={cName()}>
            <p>Resume...</p>
            <p>Resume...</p>
            <p>Resume...</p>
            <p>Resume...</p>
            <p>Resume...</p>
        </div>
    )
}
export default Resume;