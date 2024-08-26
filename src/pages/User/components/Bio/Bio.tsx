import React, { memo, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from './types';

import './Bio.css';
import { useNavigate, useParams } from 'react-router';
import { ROUTES } from '../../../../utils/routes';
import Button from '../../../../ui/Button';
import Card from '../../../../ui/Card';
import Text from '../../../../ui/Text';

const avatarIcon = require('../../../../assets/avatar.svg').default;
const okIcon = require('../../../../assets/ok.svg').default;
const locationIcon = require('../../../../assets/location.svg').default;
const inIcon = require('../../../../assets/in.svg').default;

const cName = cn('bio');

const Bio: Props = ({user, rating}) => {
        const navigate = useNavigate();
    const params = useParams();

    const passEditProfile = () => {
        navigate(ROUTES.USER_EDIT)
    }

    return (
        <Card className={cName()}>
            <div className={cName('data')}>              
                <img 
                    src={user.avatar_url || avatarIcon}
                    alt="Аватар" 
                    className={cName('avatar')}
                />

                <div className={cName('personal-info')}>
                    <div className={cName('upper-first')}>
                        <Text type='large' className={cName('fio')}>{user.fio}</Text>

                        <div className={cName('job')}>
                            {user.profession}
                        </div>

                        {user.looking_for_hackathon && 
                            <div className={cName('looking-hackathon')}>
                                <img src={okIcon} alt="" className={cName('looking-hackathon-ok')}/>
                                {`Готов${user.gender === 'Ж' ? 'а' : ''} к хакатону`}
                            </div>
                        }
                    </div>

                    <div className={cName('upper-second')}>
                        <img src={locationIcon} alt="" className={cName('location-icon')}/>

                        <Text className={cName('location')}>{user.city || 'Москва'}</Text>

                        <img src={inIcon} alt="" className={cName('in-icon')}/>
                    </div>

                    <div className={cName('rating')}>
                        <Text className={cName('rating-place')} type="violet">{rating || 0}</Text>
                        <Text className={cName('rating-text')}>место в рейтинге</Text>
                    </div>

                    {user.looking_for_job && 
                        <Text type="light" className={cName('looking-job')}>Разрешить приглашать в команду</Text>
                    }
                </div>
            </div>

            {!params.search && 
                <Button className={cName('settings')} onClick={passEditProfile}>
                    Редактировать профиль
                </Button>
            }
        </Card>
    )
}
export default memo(Bio);