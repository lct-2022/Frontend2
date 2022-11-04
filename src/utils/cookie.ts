import qs from 'qs';
import { DELETE_COOKIE_STR } from './consts';
import { ROUTES } from './routes';

function parseCookie() {
    const cookie = document.cookie ?? '';
    try {
        return qs.parse(cookie, {delimiter: ';'});
    } catch(err) {
        throw new Error();
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

export const redirectToLogin = () => {
    window.location.pathname = ROUTES.LOGIN
}



