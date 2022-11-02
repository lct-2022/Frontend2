import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from '../../components/About/types';

import './Contacts.css'

const cName = cn('contacts');

const TITLE = 'Контакты';

const Contacts: Props = ({user}) => {

    return (
        <div className={cName()}>    
            <h3 className={cName('title')}>{TITLE}</h3>

            <div className={cName('phone')}>
                <p>Телефон</p>
                <p>{user.phone || '8 (999) 999-99-99'}</p>    
            </div>

            <div className={cName('email')}>
                <p>Почта</p>
                <p>{user.email || 'email@email.ru'}</p>
            </div>
        </div>
    )
}
export default Contacts;