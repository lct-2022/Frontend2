import { IEvents, IJob, IProject, IUser, Nullable } from "../../types";

type NumerableItems<D> = {
    amount: number;
    list: Array<D>;
}

export interface IBaseStore {
    activeUser: {
        user: Nullable<IUser>;
        roles: string[],
    } 
    projects: NumerableItems<IProject>;
    users: NumerableItems<IUser>;
    jobs: NumerableItems<IJob>;
    // events?: NumerableItems<IEvents>;
}