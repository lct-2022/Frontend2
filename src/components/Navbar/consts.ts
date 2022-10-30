import { ROUTES } from "../../utils/routes";

const MENU_POINTS = {
    'Эксперты': ROUTES.EXPERTS,
    'Проекты': ROUTES.PROJECTS,
    'Cервисы': ROUTES.SERVICES,
    'Мероприятия': ROUTES.EVENTS,
    'Вакансии': ROUTES.JOBS,
}

const LOGOUT_POINT = 'Выйти';
const LOGIN_POINT = 'Войти';

export {
    MENU_POINTS,
    LOGOUT_POINT,
    LOGIN_POINT
}