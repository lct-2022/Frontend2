import React, { FC, memo } from 'react';
import {cn} from '@bem-react/classname';

import './Drop.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { removeAuthToken } from '../../../../utils/cookie';
import { TOKEN_KEY } from '../../../../utils/consts';
import { useDispatch } from 'react-redux';
import { ActiveUserActions } from '../../../../store/types/activeUser';

const cName = cn('drop');

enum DropPoints {
    Profile = 'Мой профиль',
    Logout =  'Выйти',
}

interface IProps {
    passToMyProfile: () => void;
    logout: () => void;
}

const Drop: FC<IProps> = ({passToMyProfile, logout}) => {
    return (
        <div className={cName()}>
            <div onClick={passToMyProfile} className={cName('point')}>{DropPoints.Profile}</div>

            <div className={cName('divider')}/>

            <div onClick={logout} className={cName('point')}>{DropPoints.Logout}</div>
        </div>
    )
}
export default memo(Drop);