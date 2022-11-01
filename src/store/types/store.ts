import { Event, Job, Project, User, Nullable } from "../../types";

type NumerableItems<D> = {
    amount: number;
    list: Array<D>;
}

export interface IBaseStore {
    activeUser: {
        user: Nullable<User>;
        roles: string[],
    },
    activeProject: Nullable<Project['project']>, 
    projects: NumerableItems<Project>;
    users: NumerableItems<User>;
    jobs: NumerableItems<Job>;
    // events?: NumerableItems<IEvents>;
}