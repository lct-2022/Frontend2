import { combineReducers, Reducer } from "redux";
import { IProject, IUser, Nullable } from "../../types";
import { activeUserReducer } from './activeUser';
import { projectsReducer } from './projects';

type BaseReducer = {
    activeUser: Reducer<Nullable<IUser>>;
    projects: Reducer<IProject[]>;
}

export type BaseState = {
    activeUser: Nullable<IUser>;
    projects: IProject[];
}

export const rootReducer = combineReducers({
    activeUser: activeUserReducer,
    posts: projectsReducer,
});

export type RootType = ReturnType<typeof rootReducer>
