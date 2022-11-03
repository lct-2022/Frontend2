import React, { FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'
import { applyToJob, getJobApplication, getProjectVacancies, getVacancy } from '../../../api/platform';
import { getTokenFromCookies } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../store/selectors/users';
import { DEFAULT_AVATAR } from '../../../utils/consts';
import './Application.css';
import { getUserProfile } from '../../../api/passport';
import { Application, Nullable, User, UserData } from '../../../types';
import { getUserProfileAction } from '../../../store/actions/users';

const cName = cn('application');

type Props = {
    application: Application;
    user?: User;
}

const Application: FC<Props> = ({application}) => {
    const [appliedUser, setAppliedUser] = useState<Nullable<UserData>>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUserProfile(69)
            .then(data => {
                setAppliedUser(data.result); 
            })
    }, []);

    const passToProfile = useCallback(() => {
        if (!appliedUser) {
            return;
        }

        dispatch(getUserProfileAction(appliedUser));
        navigate(ROUTES.USER);
    }, [appliedUser]);

    if (!appliedUser) {
        return null;
    }

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <p>Отклик на вакансию: ВАКАНСИЯ</p>

                <div className={cName('applied-user')}>
                    <span>
                        <p>:профиль:</p>
                    </span>

                    <span>
                        <h1 onClick={passToProfile}>{appliedUser.fio}</h1>
                    </span>
                </div>
            </div>

            <div className={cName('btns')}>
                <button>Согласиться</button>

                <button>Отклонить</button>
                
                <button>На рассмотрении</button>
            </div>
        </div>
    )
}

export default memo(Application);