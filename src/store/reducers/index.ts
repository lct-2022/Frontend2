import { combineReducers, Reducer } from "redux";
import { currentUserReducer } from './currentUser';
import { usersReducer } from "./users";
import { projectsReducer } from './projects';
import { jobsReducer } from "./jobs";
import { currentProjectReducer } from "./currentProject";
import { currentJobReducer } from "./currentJob";
import { currentApplicationsReducer } from "./applications";

export const rootReducer = combineReducers({
    authUser: currentUserReducer,
    currentProject: currentProjectReducer,
    currentJob: currentJobReducer,
    projects: projectsReducer,
    users: usersReducer,
    jobs: jobsReducer,
    currentUser: currentUserReducer,
    currentApplications: currentApplicationsReducer,
});

export type RootType = ReturnType<typeof rootReducer>
