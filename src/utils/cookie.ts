import qs from 'qs';
import { User, UserData } from '../types';
import { DELETE_COOKIE_STR } from './consts';
import { ROUTES } from './routes';

function parseCookie() {
    const cookie = document.cookie ?? '';
    try {
        return qs.parse(cookie, {delimiter: ';'});
    } catch(err) {
        // pass
    }
}

export const getTokenFromCookies = () => {
    const cookieParsed = parseCookie() || {};
    return cookieParsed['auth_token'] as string;
}

export function setAuthToken(token?: string) {
    document.cookie = `auth_token=${token}; max-age=3600*24*365`;
}

export function removeAuthToken(token?: string) {
    document.cookie = (token || '') + DELETE_COOKIE_STR;
}

export function redirectToLogin() {
    window.location.pathname = ROUTES.LOGIN
}