import { combineReducers, Reducer } from "redux";
import { activeUserReducer } from './activeUser';
import { usersReducer } from "./users";
import { projectsReducer } from './projects';
import { jobsReducer } from "./jobs";

export const rootReducer = combineReducers({
    activeUser: activeUserReducer,
    projects: projectsReducer,
    users: usersReducer,
    jobs: jobsReducer,
});

export type RootType = ReturnType<typeof rootReducer>
