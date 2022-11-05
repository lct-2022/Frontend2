export const TOKEN_KEY = 'auth_token';

export const LIMITS = {
    PROJECTS: 10,
    PROFILES: 10,
    JOBS: 10,
    EVENTS: 10,
}

export const DEFAULT_LOGO = 'https://sportishka.com/uploads/posts/2022-03/1646088782_53-sportishka-com-p-gori-kirgizstana-turizm-krasivo-foto-60.jpg';
export const DEFAULT_AVATAR = 'https://sportishka.com/uploads/posts/2022-03/1646088782_53-sportishka-com-p-gori-kirgizstana-turizm-krasivo-foto-60.jpg';

export const DELETE_COOKIE_STR = '=; Max-Age=-99999999;';
export const SET_AGE_COOKIE_STR = 'max-age=3600*24*365';

export const STORAGE_KEY = 'authorised_user_ideahunt';

export const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
export const PHONE_REGEXP = /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/i;