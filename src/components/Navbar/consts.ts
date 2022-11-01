import { ROUTES } from "../../utils/routes";

const MENU_POINTS = {
    'Главная': ROUTES.INDEX,
    'Эксперты': ROUTES.EXPERTS,
    'Проекты': ROUTES.PROJECTS,
    'Cервисы': ROUTES.SERVICES,
    'Мероприятия': ROUTES.EVENTS,
    'Вакансии': ROUTES.PROJECTS,
}

const NEW_PROJECT_POINT = 'Выложить проект';
const LOGIN_POINT = 'Войти';

export {
    MENU_POINTS,
    NEW_PROJECT_POINT,
    LOGIN_POINT
}