export const OPTIONS = [
    'Биография',
    'Резюме',
    'Проекты',
    'Комментарии',
    'Приглашения',
    'Админ',
]

export const ADMIN = 'Админ';

export const BUSINESS_INFO = [
    'Категория: Новый бизнесс',
    'Критерии: Инновационный',
];

export const YES = 'Да';
export const NO = 'Нет';

export const ITEMS_MAP: {[x in string]: string} = {
    fio: 'Фамилия им отчество',
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