import React, { FC, memo } from 'react';
import {cn} from '@bem-react/classname';

import './Drop.css';
import Text from '../../../Text';

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
            <Text type='light' onClick={passToMyProfile} className={cName('point')}>{DropPoints.Profile}</Text>

            <div className={cName('divider')}/>

            <Text type='light' onClick={logout} className={cName('point')}>{DropPoints.Logout}</Text>
        </div>
    )
}
export default memo(Drop);