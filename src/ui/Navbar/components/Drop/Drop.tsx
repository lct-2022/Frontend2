import React, { FC, RefObject, memo } from 'react';
import {cn} from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Text from '../../../Text';
import { ROUTES } from '../../../../utils/routes';
import { removeAuthToken } from '../../../../utils/cookie';
import { TOKEN_KEY } from '../../../../utils/consts';
import { AuthUserActions } from '../../../../store/types/authUser';

import './Drop.css';

const cName = cn('drop');

enum DropPoints {
    Profile = 'Мой профиль',
    Logout =  'Выйти',
}

interface IProps {
    ref: RefObject<HTMLDivElement>;
}

const Drop: FC<IProps> = ({ref}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const passToMyProfile = () => {
        navigate(ROUTES.USER);
    }

    const logout = () => {
        removeAuthToken(TOKEN_KEY);
        dispatch({
            type: AuthUserActions.UNSET_USER,
        });
        navigate(ROUTES.INDEX);
    }

    return (
        <div className={cName()} ref={ref}>
            <Text type='light' onClick={passToMyProfile} className={cName('point')}>{DropPoints.Profile}</Text>

            <div className={cName('divider')}/>

            <Text type='light' onClick={logout} className={cName('point')}>{DropPoints.Logout}</Text>
        </div>
    )
}
export default memo(Drop);