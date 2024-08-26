import qs from 'qs';
import { DELETE_COOKIE_STR, SET_AGE_COOKIE_STR } from './consts';

function parseCookie() {
    const cookie = document.cookie ?? '';
    try {
        return qs.parse(cookie, {delimiter: ';'});
    } catch(err) {
        console.info(err);
    }
}

export const getTokenFromCookies = () => {
    const cookieParsed = parseCookie() || {};
    return cookieParsed['auth_token'] as string;
}

export function setAuthToken(token?: string) {
    document.cookie = `auth_token=${token}; ${SET_AGE_COOKIE_STR}`;
}

export function removeAuthToken(token?: string) {
    document.cookie = (token || '') + DELETE_COOKIE_STR;
}