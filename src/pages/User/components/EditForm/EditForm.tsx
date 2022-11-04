import React, { ChangeEvent, useCallback, useState } from "react";
import { Formik, Field, Form, FormikProvider, useFormik } from "formik";
import { cn } from "@bem-react/classname";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "../../../../store/selectors/users";
import { Nullable } from "../../../../types";
import pick from "lodash/pick";
import { getAuthorizedUser, updateUserProfile } from "../../../../api/passport";
import { getTokenFromCookies } from "../../../../utils/cookie";
import { getAuthorizedUserAction } from "../../../../store/actions/users";
import { EMAIL_REGEXP } from "../../../../utils/consts";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../utils/routes";

import './EditProfile.css';

const cName = cn('edit-profile');

function EditProfile() {
    const currentUser = useSelector(currentUserSelector);

    const [emailValue, setEmailBalue] = useState(currentUser?.email || '');
    const [fioValue, setFioValue] = useState(currentUser?.fio || '');
    const [phoneValue, setPhoneValue] = useState(currentUser?.phone || '');
    const [cityValue, setCityValue] = useState(currentUser?.city || '');
    const [countryValue, setCountryValue] = useState(currentUser?.country || '');
    const [aboutValue, setAboutalue] = useState(currentUser?.about || '');
    const [educationValue, setEducationValue] = useState(currentUser?.education || '');

    const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailBalue(event.target.value)
    }
    const changeFio = (event: ChangeEvent<HTMLInputElement>) => {
        setFioValue(event.target.value)
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateProfile = useCallback(() => {
        updateUserProfile({
            ...currentUser,
            fio: fioValue,
            email: emailValue,
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
    }, [fioValue, emailValue, phoneValue, countryValue, cityValue, educationValue, aboutValue])

    if (!currentUser) return null;

    return (
        <div className={cName()}>
            <input type="text" value={fioValue} placeholder="Имя Фамилия" onChange={changeFio}/>
            <input type="text" value={phoneValue || ''} placeholder="Телефон" onChange={changePhone}/>
            <input type="text" value={countryValue || ''} placeholder="Страна" onChange={changeCountry}/>
            <input type="text" value={cityValue || ''} placeholder="Город" onChange={changeCity}/>
            <input type="text" value={educationValue || ''} placeholder="Образование" onChange={changeEducation}/>
            <input type="text" value={aboutValue || ''} placeholder="О себе" onChange={changeAbout}/>
            
            <div className={cName('btns')}>
                <button onClick={updateProfile}>Редактировать</button>
                <button onClick={() => navigate(-1)}>Назад в профиль</button>
            </div>
        </div>
    );
}

export default EditProfile;