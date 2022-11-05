import { ROUTES } from "../../utils/routes";

export type UserOption = 
    | 'about' 
    | 'resume' 
    | 'ideas' 
    | 'teams' 
    | 'application';

export const OPTIONS: Partial<Record<UserOption, string>> = {
    ideas: 'Идеи',
    about: 'Об эксперте',
    resume: 'Резюме',
}

export const BUSINESS_INFO = [
    'Категория: Новый бизнесс',
    'Критерии: Инновационный',
];

export const YES = 'Да';
export const NO = 'Нет';

export const ITEMS_MAP: {[x in string]: string} = {
    fio: 'Фамилия Имя Отчество',
    email: 'Электронная почта',
    birthday: 'Дата рождения',
    gender: 'Пол',
    phone: 'Номер телефона',
    country: 'Страна',
    city: 'Город',
    education: 'Обрзование',
    job: 'Работа',
    about: 'Расскажите о себе',
    admin: 'Админ',
}

export const CHANGE_TITLE = 'Редактировать';