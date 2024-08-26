import { Job, Nullable, Application, UserData, Team, ProjectData, ProjectStage } from "../../types/common";

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
    teams: Team[];
}