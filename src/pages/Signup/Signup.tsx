import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareFio } from '../../utils/fio';

import './Signup.css';

export function SignupForm() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log('render');

    const [res, setRes] = useState('');

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const changeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value)
    }

    const changeFatherName = (event: ChangeEvent<HTMLInputElement>) => {
        setFatherName(event.target.value)
    }

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    // const navigate = useNavigate();

    const clickHandler = () => {
        // event.preventDefault()
        console.log('click');
    }

    const submitHandler = () => {
        console.log('submit');
    }


    const signupAsync = useCallback(async () => {
        setEmail('');
        const url = 'https://passport.dev.lct.40ants.com';
        const body = {
            jsonrpc: '2.0',
            method: 'signup',
            params: {
                email: email,
                fio: prepareFio(lastName, name, fatherName),
                password: password,
                // email: email,
                // fio: prepareFio(lastName, name, fatherName),
                // password: password,
            },
            id: 0,
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
        const response = await fetch(url, options);
        const result = await response.json();
        setRes(result.result)
        setEmail('');

        // if (!response.ok) {
        //     setRes('Error')
        // } else {
        //     const result = await response.json();
        //     setRes(result.result)
        //     // navigate('/profile')
        // }
    }, [name, lastName, fatherName, email, password]);

    // useEffect(() => {
    //     signupAsync()
    // }, []);

    return (
        <div className="signup_form">
            <hr/>

            {res}
            <hr/>

            <h3>Регистрация</h3>

            {/* <form 
                onSubmit={submitHandler}
            > */}

                <div className="signup_input">
                    <label htmlFor="signup_name">Введите Ваше имя</label>
                    <input className="signup_name" value={name} onChange={changeName}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_lastname">Введите Вашу фамилию</label>
                    <input className="signup_lastname" value={lastName} onChange={changeLastName}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_fathername">Введите Ваше отчество</label>
                    <input className="signup_fathername" value={fatherName} onChange={changeFatherName}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_mail">Введите Вашу электронную почту</label>
                    <input className="signup_mail" value={email} onChange={changeMail}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_password">Придумайте пароль</label>
                    <input className="signup_password" value={password} onChange={changePassword}/>
                </div>

                <button 
                // type="submit"
                    onClick={signupAsync}
                >
                    Отправить
                </button>
            {/* </form> */}
        </div>
    );
}

export default SignupForm;
