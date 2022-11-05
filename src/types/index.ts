export type Nullable<D> = D | null;

interface ICommonData {
    created_at: string;
    updated_at: string;
    synced: boolean;
    id: number;
}

export type User = {
    user: ICommonData & {
        email: string,
        password_hash: string,
        avatar_url: string,
        fio: string,
        birthday: Nullable<string>,
        gender: Nullable<string>,
        phone: Nullable<string>,
        country: Nullable<string>,
        city: Nullable<string>,
        education: Nullable<string>,
        job: Nullable<string>,
        about: Nullable<string>,
        admin: Nullable<boolean>,
        projects?: ProjectData[],
        // для фильтрации
        hidden?: boolean;
    }
    rating: number;
}

// TODO Добавить поле "получили поддержку"
export type Project = {
    project: ICommonData & {
        author_id: number,
        title: string;
        description: string;
        url: string;
        contests: string;
        // для фильтрации
        hidden?: boolean;
    };
    rating: number;
}

export type ProjectData = Project['project'];
export type UserData = User['user'];

export type ProjectsList = {
    items: ProjectData[];
    'next-page-key': string;
}

export type JobsList = {
    items: Job[];
    'next-page-key': string;
}

export type UsersList = {
    items: UserData[];
    'next-page-key': string;
}

export type Team = ICommonData & {
    title: string;
    project_id: ProjectData['id'];
    project: ProjectData;
};

export type ProjectTeamMember = ICommonData & {
    user_id: number;
    job_id: number;
    job: Job;
    title: string;
};

export enum ApplicationStatus {
    APPLIED = 'applied',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
};

export type Application = ICommonData & {
    user_id: number;
    job: Job;
    job_id: Job['id'];
    message: string;
    status: ApplicationStatus;
};

export type Job = ICommonData & {
    team_id: number;
    team: Team;
    title: string;
    description: string;
    open: boolean;
    job_application: Application;
    hidden?: boolean;
}

export type Event = ICommonData & {};

export type Vote = ICommonData & {
    user_id: number;
    subject_type: 'project' | 'user';
    subject_id: number;
};

export type CommonAction<T, P = never> = {
    type: T,
    payload?: P,
}