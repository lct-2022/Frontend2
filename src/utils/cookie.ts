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
    return cookieParsed['auth_token'] as string || '';
}

export function setAuthToken(token: string) {
    const cookieParsed = parseCookie() || {};
    cookieParsed['auth_token'] = token;
    document.cookie = qs.stringify(cookieParsed, {delimiter: ';'})
}

export function removeAuthToken(token: string) {
    document.cookie = token + DELETE_COOKIE_STR;
}

export const redirectToLogin = () => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA !!!!!!!!!!!!!!!');
    
    window.location.pathname = ROUTES.LOGIN
}



