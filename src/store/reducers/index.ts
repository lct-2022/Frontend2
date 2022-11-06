import { combineReducers, Reducer } from "redux";
import { currentUserReducer } from './currentUser';
import { currentProjectReducer } from "./currentProject";
import { currentJobReducer } from "./currentJob";
import { currentApplicationsReducer } from "./applications";
import { authUserReducer } from "./authUser";
import { currentIndustriesReducer } from "./innovations";
import { currentInnovationsReducer } from "./industries";
import { currentStagesReducer } from "./stages";

export const rootReducer = combineReducers({
    authUser: authUserReducer,
    currentProject: currentProjectReducer,
    currentJob: currentJobReducer,
    currentUser: currentUserReducer,
    currentApplications: currentApplicationsReducer,
    currentIndustries: currentIndustriesReducer,
    currentInnovations: currentInnovationsReducer,
    currentStages: currentStagesReducer,
});

export type RootType = ReturnType<typeof rootReducer>
