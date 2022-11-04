import { ROUTES } from "../../utils/routes";

export type UserOption = 
    | 'about' 
    | 'resume' 
    | 'projects' 
    | 'teams' 
    | 'application';

export const OPTIONS: Partial<Record<UserOption, string>> = {
    about: 'Биография',
    resume: 'Резюме',
    projects: 'Идеи',
}

// export const ADMIN_OPTION: Partial<Record<UserOption, string>> = {
//     teams: 'Список команд',
//     application: 'Отклики',
// };

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