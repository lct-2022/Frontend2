import { IJob, IProject, IUser, Nullable } from "../../types";

export interface IBaseStore {
    activeUser: Nullable<IUser>;
    projects: IProject[];
    users: IUser[];
    jobs: IJob[];
}