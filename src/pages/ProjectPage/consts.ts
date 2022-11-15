export type ProjectOption = 
    | 'stages'
    | 'materials'
    | 'team'
    | 'vacancies'
    | 'services';

export const OPTIONS: Partial<Record<ProjectOption, string>> = {
    stages: 'Этапы развития',
    materials: 'Материалы',
    team: 'Команда',
    vacancies: 'Вакансии',
    services:  'Сервисы',
}