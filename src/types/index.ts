export type Nullable<D> = D | null;
export type Undefinedable<D> = D | undefined;
// export type Map<D> = {[x in any]: D};

interface ICommonData {
    'created-at': string;
    'updated-at': string;
    synced: boolean;
    id: number;
}

export type User = {
    user: ICommonData & {
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
        admin: boolean,
    }
    rating: number;
    // для фильтрации
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
    // для фильтрации
    hidden?: boolean;
}

export type ProjectData = Project['project'];
export type UserData = User['user'];

export type Team = ICommonData & {
    title: string;
    'project-id': number | {};
    project: Project;
};

export type ProjectTeamMember = ICommonData & {
    'user-id': number;
    'job-id': number;
    job: Job;
    title: string;
};

export type Job = ICommonData & {
    'team-id': number;
    team: Team;
    title: string;
    description: string;
    open: boolean;
    hidden?: boolean;
}

enum ApplicationStatus {
    APPLIED = 'applied',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
};

export type Application = ICommonData & {
    'user-id': number;
    job: Job;
    'job-id': number | {};
    message: string;
    status: ApplicationStatus;
};

export type Event = ICommonData & {}

export type CommonAction<T, P = never> = {
    type: T,
    payload?: P,
}