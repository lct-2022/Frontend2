// export enum UserActions {
//     SET_USER = 'SET_USER',
//     LOGOUT_USER = 'LOGOUT_USER',
// }

const UserActions = [
    'SET_USER',
    'LOGOUT_USER',
] as const

const ProjectsActions = [
    'SET_PROJECT',
    'LOGOUT_PROJECT',
] as const

type UserActions = typeof UserActions[number]
type ProjectActions = typeof ProjectsActions[number]


type ActionTypes = 
    | UserActions
    | ProjectActions

export type CommonAction<D> = {
    type: string,
    payload?: D,
}

const rtest: CommonAction<Array<any>> = {
    type: UserActions.SET_USER,
    payload: [1,2,3]
}

const t: UserActions = 'SET_USER'