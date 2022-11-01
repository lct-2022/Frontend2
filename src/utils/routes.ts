export const ROUTES = {
    INDEX: '/',
    SIGNUP: '/signup',
    LOGIN: '/login',
    PROJECTS: '/projects',
    PROJECT: '/project',
    PROJECT_CREATE: '/project/new',
    SERVICES: '/services',
    EXPERTS: '/users/administrators',
    PARTICIPANTS: '/users/participants',
    USER: '/profile',
    JOBS: '/vacancies',
    JOB: '/vacancy',
    EVENTS: '/events',
    CHAT: '/chat',
    APPLICATION: '/apply',
}

export const NOT_NAVBAR_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
]