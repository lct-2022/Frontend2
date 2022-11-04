export const ROUTES = {
    INDEX: '/',
    SIGNUP: '/signup',
    LOGIN: '/login',
    PROJECTS: '/projects',
    PROJECT: '/project',
    PROJECT_CREATE: '/project/new',
    SERVICES: '/services',
    EXPERTS: '/profiles',
    EXPERTS_SEARCH: '/profiles/:search',
    PARTICIPANTS: '/users/participants',
    USER: '/profile',
    USER_SEARCH: '/profile/:search',
    JOBS: '/vacancies',
    JOB: '/vacancy',
    EVENTS: '/events',
    CHAT: '/chat',
    APPLICATIONS: '/applications',
    TEAMS: '/teams',
}

export const NOT_NAVBAR_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
]