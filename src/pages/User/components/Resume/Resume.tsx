import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

const cName = cn('resume')

const Resume: Props = () => {
    return (
        <div className={cName()}>
            
        </div>
    )
}
export default Resume;