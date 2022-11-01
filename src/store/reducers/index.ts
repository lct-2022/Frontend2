import { combineReducers, Reducer } from "redux";
import { activeUserReducer } from './activeUser';
import { usersReducer } from "./users";
import { projectsReducer } from './projects';
import { jobsReducer } from "./jobs";
import { activeProjectReducer } from "./activeProject";

export const rootReducer = combineReducers({
    activeUser: activeUserReducer,
    activeProject: activeProjectReducer,
    projects: projectsReducer,
    users: usersReducer,
    jobs: jobsReducer,
});

export type RootType = ReturnType<typeof rootReducer>
