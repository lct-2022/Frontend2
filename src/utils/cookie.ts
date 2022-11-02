import qs from 'qs';
import { TOKEN } from './consts';

function parseCookie() {
    const {cookie} = document;
    try {  
        if (!cookie) {
            return;
        }

        return qs.parse(cookie, {delimiter: ';'});
    } catch(err) {
        throw new Error();
    }
}

export const getTokenFromCookies = () => {
    return TOKEN;
    // const cookieParsed = parseCookie();

    // if (!cookieParsed) {
    //     return '';
    // }

    // return cookieParsed['auth_token'] as string || '';
}

export function setAuthToken(token: string) {
    const cookieParsed = parseCookie();

    if (!cookieParsed) {
        return;
    }

    cookieParsed['auth_token'] = token;
    document.cookie = qs.stringify(cookieParsed, {delimiter: ';'})
}

export function removeAuthToken() {
    const cookieParsed = parseCookie();
    
    if (!cookieParsed) {
        return;
    }

    delete cookieParsed['auth_token'];
    document.cookie = qs.stringify(cookieParsed, {delimiter: ';'})

    
}




