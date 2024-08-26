import React, { FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'
import { applyToJob, getJobApplication, getApplications, getVacancy, replyApplication } from '../../../api/platform';
import { getTokenFromCookies } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../store/selectors/users';
import { DEFAULT_AVATAR } from '../../../utils/consts';
import { getUserProfile } from '../../../api/passport';
import { Application, Nullable, User, UserData } from '../../../types/common';
import { getUserProfileAction } from '../../../store/actions/user';
import './Application.css';
import Button from '../../Button';
import { CurrentUserActions } from '../../../store/types/currentUser';

const cName = cn('application');

type Props = {
    application: Application;
    user?: User;
}

const ApplicationComp: FC<Props> = ({application}) => {
    const [appliedUser, setAppliedUser] = useState<Nullable<UserData>>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user_id, job, message, status} = application;

    useEffect(() => {
        getUserProfile(user_id)
            .then(data => {
                setAppliedUser(data || null); 
            })
    }, []);

    const passToProfileFromApplication = useCallback(() => {
        if (!appliedUser) {
            return;
        }

        dispatch({
            type: CurrentUserActions.SET_USER_SHOWN,
            payload: appliedUser,
        });
        navigate(`${ROUTES.USER}/search`);
    }, [appliedUser]);

    const acceptApplication = useCallback(() => {
        replyApplication('accept', application?.id)
    }, [application?.id]);

    const declineApplication = useCallback(() => {
        replyApplication('decline', application?.id)
    }, [application?.id])

    if (!appliedUser) {
        return null;
    }

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <p>Отклик на вакансию: {job.title}</p>

                <div className={cName('applied-user')}>
                    <span>
                        <p>профиль:</p>
                    </span>

                    <span>
                        <h1 onClick={passToProfileFromApplication}>{appliedUser.fio}</h1>
                    </span>
                </div>

                <p>{message}</p>
            </div>

            <div className={cName('btns')}>
                <Button onClick={acceptApplication}>Принять</Button>

                <Button onClick={declineApplication}>Отклонить</Button>
                
                <Button>На рассмотрении</Button>
            </div>
        </div>
    )
}

export default memo(ApplicationComp);