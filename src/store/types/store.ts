import { Event, Job, Project, User, Nullable, ProjectTeamMember, Application, UserData, Team } from "../../types";

type NumerableItems<D> = {
    amount: number;
    list: Array<D>;
}

export type ActiveProject = {
    project: Nullable<Project['project']>;
    team: Nullable<ProjectTeamMember[]>;
    vacancies: Nullable<Application[]>;
    rating: number;
}

export interface IBaseStore {
    activeUser:  Nullable<UserData>;
    activeProject: ActiveProject;
    activeJob: Nullable<Job>;
    projects: NumerableItems<Project>;
    users: NumerableItems<User>;
    jobs: NumerableItems<Job>;
    // events?: NumerableItems<IEvents>;
    teams: Team[];
}