import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {cn} from '@bem-react/classname';
import { Props } from '../About/types';

import Text from '../../../../ui/Text';
import { ROUTES } from '../../../../utils/routes';

import './Contacts.css';
import { hidePhone, preparePhone } from '../../../../utils/phone';

const cName = cn('contacts');

const TITLE = 'Контакты';

const Contacts: Props = ({user}) => {
    const navigate = useNavigate();
    const params = useParams();

    const passToEdit = () => {
        navigate(ROUTES.USER_EDIT);
    }

    const phone = preparePhone(user.phone);

    return (
        <div className={cName()}>    
            <h3 className={cName('title')}>{TITLE}</h3>

            <div className={cName('email-block')}>
                <div className={cName('email-header')}>
                    <Text>Почта:</Text>
                    {!params.search && <Text type="light" onClick={passToEdit} className={cName('edit')}>Редактировать</Text>}
                </div>
                <Text className={cName('email')}>{user.email}</Text>
            </div>

            <div className={cName('phone-block')}>
                <div className={cName('phone-header')}>
                    <Text>Телефон:</Text>
                    {!params.search && <Text type="light" onClick={passToEdit} className={cName('edit')}>Редактировать</Text>}
                </div>
                <Text className={cName('phone')}>{params.search ? hidePhone(phone) : phone}</Text>    
            </div>
        </div>
    )
}
export default Contacts;