import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { TOKEN } from '../../utils/consts';
import { prepareFio } from '../../utils/fio';

import './Profile.css';

export function Profile() {
    const getRoles = async () => {
        const url = 'https://passport.dev.lct.40ants.com';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': TOKEN,
        }
        const body = {
            jsonrpc: '2.0',
            method: 'my-roles',
            params: {},
            id: 0,
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
        const response = await fetch(url, options);
        const result = await response.json();
    }

    // Получаем роль
    useEffect(() => {
        getRoles()
    }, []);

    return (
        <div className="">
            PROFILE
        </div>
    );
}

export default Profile;