import { Job, Project, User, Nullable, Application, UserData, Team, ProjectData, ProjectStage } from "../../types";

export interface IBaseStore {
    authUser:  Nullable<UserData>;
    currentUser: Nullable<UserData>;
    currentProject: Nullable<ProjectData>;
    currentJob: Nullable<Job>;
    currentApplications: Nullable<Application[]>;
    currentUserRating: Nullable<number>;
    currentIndustries: Nullable<string[]>;
    currentInnovations: Nullable<string[]>;
    currentStages: Nullable<ProjectStage[]>;
    // events?: NumerableItems<IEvents>;
    teams: Team[];
}