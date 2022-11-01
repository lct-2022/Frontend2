export type Nullable<D> = D | null;
export type Undefinedable<D> = D | undefined;
// export type Map<D> = {[x in any]: D};

interface ICommonData {
    'created-at': string;
    'updated-at': string;
    synced: boolean;
    id: number;
}

export type User = ICommonData & {
    email: string,
    'password-hash': string,
    'avatar-url': string,
    fio: string,
    birthday: Nullable<string>,
    gender: Nullable<string>,
    phone: Nullable<string>,
    country: Nullable<string>,
    city: Nullable<string>,
    education: Nullable<string>,
    job: Nullable<string>,
    about: Nullable<string>,
    admin: Nullable<string>,
    hidden?: boolean;
}

// TODO Добавить поле "получили поддержку"
export type Project = {
    project: ICommonData & {
        'author-id': number,
        title: string;
        description: string;
        url: string;
        contests: string;
    };
    rating: number;
    hidden?: boolean;
}

export type ProjectData = Project['project'];

export type Job = ICommonData & {
    'team-id': number;
    title: string;
    description: string;
    open: boolean;
    hidden?: boolean;
}

type ApplicationStatus = 'applied' | 'accepted' | 'declined';

export type Application = ICommonData & {
    'user-id': number;
    job: Job;
    'job-id': {};
    message: string;
    starus: ApplicationStatus;
};

export type Event = ICommonData & {}

export type CommonAction<T, P = never> = {
    type: T,
    payload?: P,
}