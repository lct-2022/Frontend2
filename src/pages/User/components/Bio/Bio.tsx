import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

import './Bio.css'

const cName = cn('bio')

const Bio: Props = ({user, rating}) => {
    const [editMode, setEditMode] = useState(false);

    const editModeToggle = () => {
        setEditMode(prev => !prev);
    }

    return (
        <div className={cName()}>
            <div className={cName('data')}>
               
                <img src={user['avatar-url']} alt="Аватар" className={cName('avatar')}/>

                <div className={cName('personal-info')}>
                    <p>{user.fio}</p>
                    
                    <div className={cName('location')}>
                        <p>{user.city}</p>
                        <p>{user.country}</p>
                    </div>

                    <div className={cName('rating')}>{rating}</div>
                </div>

                <div className={cName('status')}>
                    {user.admin ? 'Эксперт' : 'Неэксперт'}
                </div>

                <div className={cName('hakatons-experience')}>
                    Опыт в хакатонах
                </div>
            </div>

            <button className={cName('settings')} onClick={editModeToggle}>
                Редактировать профиль
            </button>
        </div>
    )
}
export default Bio;