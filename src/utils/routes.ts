export const ROUTES = {
    INDEX: '/',
    SIGNUP: '/signup',
    LOGIN: '/login',
    PROJECTS: '/projects',
    PROJECT: '/project',
    PROJECT_CREATED: '/project/:created',
    PROJECT_CREATE: '/project/new',
    SERVICES: '/services',
    EXPERTS: '/profiles',
    EXPERTS_SEARCH: '/profiles/:search',
    PARTICIPANTS: '/users/participants',
    USER: '/profile',
    USER_SEARCH: '/profile/:search',
    USER_EDIT: '/profile/edit',
    JOBS: '/vacancies',
    JOB: '/vacancy',
    JOB_CREATE: '/vacancy/create',
    EVENTS: '/events',
    CHAT: '/chat',
    APPLICATIONS: '/applications',
    TEAMS: '/teams',
}

export const NOT_NAVBAR_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
]