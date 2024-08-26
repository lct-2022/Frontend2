import React, {memo, useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'
import {Props} from './types';
import { useDispatch } from 'react-redux';
import { getUserProfileAction } from '../../../store/actions/user';
import Button from '../../Button';
import Spinner from '../../Spinner';
import Text from '../../Text';

import './ExpertItem.css';

const cName = cn('expert-card');

const ExpertCard: Props = ({user, rating, canBeInvited}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const {
        fio,
        job,
        looking_for_hackathon,
        looking_for_job,
        avatar_url, id
    } = user;

    const passToProfile = useCallback(() => {
        setLoading(true);
        Promise.all([
            new Promise(res => res(dispatch<any>(getUserProfileAction(id)))),
        ])
            .then(() => {
                navigate(`${ROUTES.USER}/search`);
                setLoading(false);
            })
    }, [id]);

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className={cName()}>
            <img src={avatar_url} alt="Аватар" className={cName('avatar')}/>

            <div className={cName('data')}>
                <div className={cName('fio')} onClick={passToProfile}>{fio}</div>
                <div className={cName('job')}>{job}</div>

                {rating !== undefined && <div className={cName('rate')}>rate:&nbsp;{rating}</div>}

                <div className={cName('horizontal')}>
                    {looking_for_hackathon && <Text>Хочет в хакатон</Text>}

                    {looking_for_job && <Text>Хочет в команду</Text>}
                </div>
            </div>

            {/* Уведомления потом */}
            {canBeInvited && 
                <div>
                    <Button>Пригласить в команду</Button>
                    <Button onClick={passToProfile}>Посмотреть профиль</Button>
                </div>
            }
        </div>
    )
}

export default memo(ExpertCard);