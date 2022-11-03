import { combineReducers, Reducer } from "redux";
import { activeUserReducer } from './activeUser';
import { usersReducer } from "./users";
import { projectsReducer } from './projects';
import { jobsReducer } from "./jobs";
import { activeProjectReducer } from "./activeProject";
import { activeJobReducer } from "./activeJob";
import { shownUserReducer } from "./shownUser";
import { ApplicationsReducer } from "./applications";

export const rootReducer = combineReducers({
    activeUser: activeUserReducer,
    activeProject: activeProjectReducer,
    activeJob: activeJobReducer,
    projects: projectsReducer,
    users: usersReducer,
    jobs: jobsReducer,
    shownUser: shownUserReducer,
    applications: ApplicationsReducer,
});

export type RootType = ReturnType<typeof rootReducer>
