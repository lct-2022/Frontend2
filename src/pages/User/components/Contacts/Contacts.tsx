import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from '../../components/About/types';

import './Contacts.css'
import Text from '../../../../components/Text';

const cName = cn('contacts');

const TITLE = 'Контакты';

const Contacts: Props = ({user}) => {

    return (
        <div className={cName()}>    
            <h3 className={cName('title')}>{TITLE}</h3>

            <div className={cName('phone')}>
                <Text>Телефон:</Text>
                <Text type="light">{user.phone}</Text>    
            </div>

            <div className={cName('email')}>
                <Text>Почта:</Text>
                <Text type='light'>{user.email}</Text>
            </div>
        </div>
    )
}
export default Contacts;