import { Job, Project, User, Nullable, Application, UserData, Team, ProjectData } from "../../types";

type NumerableItems<D> = {
    amount: number;
    list: Array<D>;
}

export interface IBaseStore {
    authUser:  Nullable<UserData>;
    currentUser: Nullable<UserData>;
    currentProject: Nullable<ProjectData>;
    currentJob: Nullable<Job>;
    projects: NumerableItems<Project>;
    currentApplications: Nullable<Application[]>;
    // events?: NumerableItems<IEvents>;
    teams: Team[];
}