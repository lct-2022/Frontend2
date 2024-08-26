import { IStats } from "../../../../types/common";

export const TITLE = 'Выложи идею и найди команду для ее реализации';

export const CARD_TITLES: {[x in keyof IStats]: string} = {
    num_projects: 'Идей в базе',
    num_jobs: 'Вакансий',
    supported_projects:  'Получили поддержку',
};