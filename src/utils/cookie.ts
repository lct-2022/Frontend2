import qs from 'qs';

function parseCookie() {
    const {cookie} = document;
    try {  
        if (!cookie) {
            return;
        }

        return qs.parse(cookie, {delimiter: '; '});
    } catch(err) {
        throw new Error();
    }
}

export const getTokenFromCookies = () => {
    const cookieParsed = parseCookie();

    if (!cookieParsed) {
        return '';
    }

    return cookieParsed['auth_token'] as string || '';
}

export function setAuthToken(token: string) {
    const authCookie = `auth_token=${token};`
    document.cookie = authCookie;
}






