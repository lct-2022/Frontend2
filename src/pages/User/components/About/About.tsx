import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

import Text from '../../../../ui/Text';
import { ROUTES } from '../../../../utils/routes';

import './About.css'

const cName = cn('about');

const About: Props = ({user}) => {
    const navigate = useNavigate();    
    const params = useParams();

    const passToEdit = useCallback(() => {
        navigate(ROUTES.USER_EDIT)
    }, [])

    return (
        <div className={cName()}>
            <div className={cName('info')}>
                {user.about || 'Не заполнено'}

                {!params.search && <Text type="light" className={cName('edit')} onClick={passToEdit}>Редактировать</Text>}
            </div>

            <div className={cName('education')}>
                {user.education || 'Не заполнено'}

                {!params.search && <Text type="light" className={cName('edit')} onClick={passToEdit}>Редактировать</Text>}
            </div>
        </div>
    )
}
export default About;