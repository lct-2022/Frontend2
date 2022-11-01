import { Event, Job, Project, User, Nullable, ProjectTeamMember, Application } from "../../types";

type NumerableItems<D> = {
    amount: number;
    list: Array<D>;
}

export interface IBaseStore {
    activeUser: {
        user: Nullable<User>;
        roles: string[],
    },
    activeProject: {
        project: Nullable<Project['project']>;
        team: ProjectTeamMember[];
        vacancies: Application[];
    }, 
    projects: NumerableItems<Project>;
    users: NumerableItems<User>;
    jobs: NumerableItems<Job>;
    // events?: NumerableItems<IEvents>;
    activeJob: Nullable<Job>;
}