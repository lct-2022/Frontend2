import { Event, Job, Project, User, Nullable, ProjectTeamMember, Application } from "../../types";

type NumerableItems<D> = {
    amount: number;
    list: Array<D>;
}

export interface IBaseStore {
    activeUser:  Nullable<User>;
    activeProject: {
        project: Nullable<Project['project']>;
        team: Nullable<ProjectTeamMember[]>;
        vacancies: Nullable<Application[]>;
    }, 
    projects: NumerableItems<Project>;
    users: NumerableItems<User>;
    jobs: NumerableItems<Job>;
    // events?: NumerableItems<IEvents>;
    activeJob: Nullable<Job>;
}