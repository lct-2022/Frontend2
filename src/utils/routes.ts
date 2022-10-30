export const ROUTES = {
    INDEX: '/',
    SIGNUP: '/signup',
    LOGIN: '/login',
    PROJECTS: '/projects',
    SERVICES: '/services',
    EXPERTS: '/users/administrators',
    PARTICIPANTS: '/users/participants',
    USER: '/profile',
    PROJECT: '/profile/:id',
    JOBS: '/vacancies',
    EVENTS: '/events',
    CHAT: '/chat',
}

export const NOT_NAVBAR_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
]