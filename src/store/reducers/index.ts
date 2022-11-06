import { combineReducers, Reducer } from "redux";
import { currentUserReducer } from './currentUser';
import { currentProjectReducer } from "./currentProject";
import { currentJobReducer } from "./currentJob";
import { currentApplicationsReducer } from "./applications";
import { authUserReducer } from "./authUser";

export const rootReducer = combineReducers({
    authUser: authUserReducer,
    currentProject: currentProjectReducer,
    currentJob: currentJobReducer,
    currentUser: currentUserReducer,
    currentApplications: currentApplicationsReducer,
});

export type RootType = ReturnType<typeof rootReducer>
