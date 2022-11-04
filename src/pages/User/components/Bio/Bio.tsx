import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

import './Bio.css'
const avatarIcon = require('../../../../assets/avatar.svg')

const cName = cn('bio')

const Bio: Props = ({user, rating}) => {
    const [editMode, setEditMode] = useState(false);

    const editModeToggle = () => {
        setEditMode(prev => !prev);
    }
    console.log(avatarIcon);
    
    return (
        <div className={cName()}>
            <div className={cName('data')}>
               
                <img 
                    // src={user['avatar_url']}
                    src={avatarIcon}
                    alt="Аватар" 
                    className={cName('avatar')}
                />

                <div className={cName('personal_info')}>
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

                <div className={cName('hakatons_experience')}>
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