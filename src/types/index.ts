export interface IUser {

}

export interface IProject {
    'created-at': string;
    'updated-at': string;
    synced: boolean;
    id: number;
    'author-id': number,
    title: string;
    description: string;
    url: string;
    contests: string;
}

export interface IJob {
    'created-at': string;
    'updated-at': string;
    synced: boolean;
    id: number;
    'team-id': number;
    title: string;
    description: string;
    open: boolean;
}

export interface IEvents {
    
}