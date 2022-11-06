import { Job, Project, User, Nullable, Application, UserData, Team, ProjectData } from "../../types";

export interface IBaseStore {
    authUser:  Nullable<UserData>;
    currentUser: Nullable<UserData>;
    currentProject: Nullable<ProjectData>;
    currentJob: Nullable<Job>;
    currentApplications: Nullable<Application[]>;
    currentUserRating: Nullable<number>;
    currentIndustries: Nullable<string[]>;
    currentInnovations: Nullable<string[]>;
    currentProjectStages: Nullable<string[]>;
    // events?: NumerableItems<IEvents>;
    teams: Team[];
}