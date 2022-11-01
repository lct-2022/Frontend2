export const OPTIONS = [
    'Биография',
    'Резюме',
    'Список команд',
    'Проекты',
    'Приглашения',
]

export const ADMIN = 'Админ';

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