const ActiveUserActionsList = [
    'SET_USER',
    'LOGOUT_USER',
] as const;

const ProjectsActionsList = [
    'SET_PROJECTS',
    'ADD_PROJECT',
    'DELETE_PROJECT',
    'UPDATE_PROJECT',
] as const;

export type ActiveUserActions = typeof ActiveUserActionsList[number];
export type ProjectActions = typeof ProjectsActionsList[number];

type ActionTypes = 
    | ActiveUserActions
    | ProjectActions

export type CommonAction<D> = {
    type: ActionTypes,
    payload?: D,
}

// export type Actions = CommonAction