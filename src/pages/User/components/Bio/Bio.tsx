import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from './types';

import './Bio.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../../utils/routes';

const avatarIcon = require('../../../../assets/avatar.svg').default;

const cName = cn('bio')

const Bio: Props = ({user, rating}) => {
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const passEditProfile = () => {
        navigate(ROUTES.USER_EDIT)
    }

    const editModeToggle = () => {
        setEditMode(prev => !prev);
    }
    
    return (
        <div className={cName()}>
            <div className={cName('data')}>
               
                <img 
                    src={user.avatar_url || avatarIcon}
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

            <button className={cName('settings')} onClick={passEditProfile}>
                Редактировать профиль
            </button>
        </div>
    )
}
export default Bio;