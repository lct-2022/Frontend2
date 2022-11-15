import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { cn } from "@bem-react/classname";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../../../../store/selectors/users";
import {  updateUserProfile } from "../../../../api/passport";
import { getTokenFromCookies } from "../../../../utils/cookie";
import { getAuthorizedUserAction } from "../../../../store/actions/users";
import { PHONE_REGEXP } from "../../../../utils/consts";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../utils/routes";

import Button from "../../../../components/Button";
import { getSkills } from "../../../../api/platform";
import Spinner from "../../../../components/Spinner";

import './EditProfile.css';

const cName = cn('edit-profile');

const clientQury = new QueryClient();

function EditProfile() {
    const authUser = useSelector(authUserSelector);

    const [nameValue, setNameValue] = useState(authUser?.fio.split(' ')[0] || '');
    const [lastnameValue, setLastnameValue] = useState(authUser?.fio.split(' ')[1] || '');
    const [phoneValue, setPhoneValue] = useState(authUser?.phone || '');
    const [cityValue, setCityValue] = useState(authUser?.city || '');
    const [countryValue, setCountryValue] = useState(authUser?.country || '');
    const [aboutValue, setAboutalue] = useState(authUser?.about || '');
    const [educationValue, setEducationValue] = useState(authUser?.education || '');
    const [avatarValue, setAvatarValue] = useState('');
    const [isJob, setIsJob] = useState(false);
    const [isHakaton, setIsHakaton] = useState(false);

    const [skillState, setSkillState] = useState<{name: string, selected: boolean}[]>([]);

    const {data, isLoading} = useQuery('skillss', () => getSkills());

    useEffect(() => {
        data && setSkillState(data.map(el => ({name: el.title, selected: false})));
    }, [data]);

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value)
    }
    const changeLastname = (event: ChangeEvent<HTMLInputElement>) => {
        setLastnameValue(event.target.value)
    }
    const changePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value)
    }
    const changeCountry = (event: ChangeEvent<HTMLInputElement>) => {
        setCountryValue(event.target.value)
    }
    const changeCity = (event: ChangeEvent<HTMLInputElement>) => {
        setCityValue(event.target.value)
    }
    const changeEducation = (event: ChangeEvent<HTMLInputElement>) => {
        setEducationValue(event.target.value)
    }
    const changeAbout = (event: ChangeEvent<HTMLInputElement>) => {
        setAboutalue(event.target.value)
    }
    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        setAvatarValue(event.target.value)
    }
    const changeIsJob = (event: ChangeEvent<HTMLInputElement>) => {
        setIsJob(event.target.checked ? true : false)
    }
    const changeIsHak = (event: ChangeEvent<HTMLInputElement>) => {
        setIsHakaton(event.target.checked ? true : false)
    }
    ///
    const changeSkills = useCallback((name: string) => {
        setSkillState(prev => prev.map(el => el.name === name ? {...el, selected: !el.selected} : el));
      }, []);
    ///

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateProfile = useCallback(() => {
        if (!phoneValue.match(PHONE_REGEXP)) {
            alert('Невалидный номер телефона')
            return;
        }
        if (!phoneValue || !nameValue || !lastnameValue || !educationValue || !countryValue || !cityValue || !aboutValue) {
            alert('Пожалуйста, заполните все поля!')
            return;
        }
        updateUserProfile({
            ...authUser,
            fio: `${nameValue} ${lastnameValue}`,
            phone: phoneValue,
            country: countryValue,
            city: cityValue,
            education: educationValue,
            about: aboutValue,
        }, getTokenFromCookies())
            .then(() => {
                return new Promise((res) => {
                    res(dispatch<any>(getAuthorizedUserAction(getTokenFromCookies())))
                  })
            })
            .then(() => {
                navigate(ROUTES.USER);
            })
    }, [nameValue, lastnameValue, phoneValue, countryValue, cityValue, educationValue, aboutValue])

    if(isLoading) return <Spinner/>

    if (!authUser) return null;

    return (
        <QueryClientProvider client={clientQury}>
            <div className={cName()}>
                <div className={cName('input-block')}>
                    <label htmlFor="name">Имя</label>
                    <input type="text" name="name" value={nameValue} placeholder="Имя" onChange={changeName}/>
                </div>

                <div className={cName('input-block')}>
                    <label htmlFor="lastname">Фамилия</label>
                    <input type="text" name="lastname" value={lastnameValue} placeholder="Фамилия" onChange={changeLastname}/>
                </div>

                <div className={cName('input-block')}>
                    <label htmlFor="phone">Номер телефона</label>
                    <input type="text" name="phone" value={phoneValue} placeholder="Телефон" onChange={changePhone}/>
                </div>

                <div className={cName('input-block')}>
                    <label htmlFor="country">Страна</label>
                    <input type="text" name="country" value={countryValue} placeholder="Страна" onChange={changeCountry}/>
                </div>

                <div className={cName('input-block')}>
                    <label htmlFor="city">Город</label>
                    <input type="text" name="city" value={cityValue} placeholder="Город" onChange={changeCity}/>
                </div>

                <div className={cName('input-block')}>
                    <label htmlFor="education">Образование</label>
                    <input type="text" name="education" value={educationValue} placeholder="Образование" onChange={changeEducation}/>
                </div>

                <div className={cName('input-block', {about: true})}>
                    <label htmlFor="about">О себе</label>
                    <input type="text" name="about" value={aboutValue} placeholder="О себе" className={cName('input', {about: true})} onChange={changeAbout}/>
                </div>

                <div className={cName('input-block')}>
                    <label htmlFor="avatar">Аватар (ссылка)</label>
                    <input type="text" name="avatar" value={avatarValue} placeholder="url" onChange={changeAvatar}/>
                </div>

                {data?.map(({id, title}) => (
                  <div key={id}>
                        <label htmlFor={title}>{title}</label>
                        <input name={title} value={title} className={cName('chbx')} type="checkbox" onChange={() => {changeSkills(title)}}/>
                    </div>
                ))}

                <div className={cName('input-block-chbx')}>
                    <label htmlFor="job">Хочу в команду</label>
                    <input type="checkbox" className={cName('chbx')} name="job" value={avatarValue} onChange={changeIsJob}/>
                </div>

                <div className={cName('input-block-chbx')}>
                    <label htmlFor="hakaton" >Хочу на хакатон</label>
                    <input type="checkbox" className={cName('chbx')} name="hakaton" value={avatarValue} onChange={changeIsHak}/>
                </div>
                
                <div className={cName('btns')}>
                    <Button onClick={updateProfile}>Редактировать</Button>
                    <Button onClick={() => navigate(-1)}>Назад в профиль</Button>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default EditProfile;