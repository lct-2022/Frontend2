export type Nullable<D> = D | null;

// export type Undefinedable<D> = D | undefined;
// export type Map<D> = {[x in any]: D};

interface ICommonData {
    'created-at': string;
    'updated-at': string;
    synced: boolean;
    id: number;
}

export type IUser = ICommonData & {
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
}

// TODO Добавить поле "получили поддержку"
export type IProject = {
    project: ICommonData & {
        'author-id': number,
        title: string;
        description: string;
        url: string;
        contests: string;
    };
    rating: number;
}

export type ProjectData = IProject['project'];

export type IJob = ICommonData & {
    'team-id': number;
    title: string;
    description: string;
    open: boolean;
}

export type IEvents = ICommonData & {}

export type CommonAction<T, P = never> = {
    type: T,
    payload?: P,
}