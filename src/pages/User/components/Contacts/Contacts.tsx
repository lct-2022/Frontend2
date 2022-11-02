import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from '../../components/About/types';

import './About.css'

const cName = cn('contacts');

const Contacts: Props = ({user}) => {

    return (
        <div className={cName()}>         
            <div className={cName('phone')}>{user.phone}</div>

            <div className={cName('email')}>{user.email}</div>
        </div>
    )
}
export default Contacts;