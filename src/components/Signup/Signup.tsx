import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';

import './Signup.css';

export function SignupForm() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [res, setRes] = useState('');

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const changeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value)
    }

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const signupAsync = async () => {
        const url = 'https://passport.dev.lct.40ants.com/';
        const body = {
            jsonrpc: '2.0',
            method: 'signup',
            params: {
                email: 'testEmail',
                fio: 'testFio',
                password: 'testPassword',
            },
            id: 1,
        }
        const headers = {
            'Content-Type': 'application/json',
            'authorization': 'token',
        }
        const options = {
            method: 'POST',
            headers,
            // credentals: 'include',
            mode: 'no-cors' as RequestMode,
            body: JSON.stringify(body),
        }
        const response = await fetch(url, options);
        console.log(response);
        const result = await response.json()
        setRes(result.result)
    }

    useEffect(() => {
        signupAsync();
    }, []);

    return (
        <div className="signup_form">
            <hr/>

            {res}

            {/* <button onClick={signupAsync}>
                GET PET
            </button>
            {pet}

            <button>
                CREATE PET
            </button>

            <button>
                LIST PETS
            </button> */}
            <hr/>

            <h3>Регистрация</h3>

            <form onSubmit={signupAsync}>

                <div className="signup_input">
                    <label htmlFor="signup_name">Введите Ваше имя</label>
                    <input className="signup_name" value={name} onChange={changeName}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_lastname">Введите Вашу фамилию</label>
                    <input className="signup_lastname" value={lastName} onChange={changeLastName}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_lastname">Введите Ваше отчество</label>
                    <input className="signup_lastname" value={lastName} onChange={changeLastName}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_mail">Введите Вашу электронную почту</label>
                    <input className="signup_mail" value={email} onChange={changeMail}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_mail">Придумайте пароль</label>
                    <input className="signup_mail" value={lastName} onChange={changeLastName}/>
                </div>

                <button>
                    Отправить
                </button>

            </form>
        </div>
    );
}

export default SignupForm;
