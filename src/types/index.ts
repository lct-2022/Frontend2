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
        projects?: Project[],
    }
    rating: number;
    // для фильтрации
    hidden?: boolean;
}

// TODO Добавить поле "получили поддержку"
export type Project = {
    project: ICommonData & {
        author_id: number,
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
    project_id: ProjectData['id'];
    project: ProjectData;
};

export type ProjectTeamMember = ICommonData & {
    user_id: number;
    job_id: number;
    job: Job;
    title: string;
};

export type Job = ICommonData & {
    team_id: number;
    team: Team;
    title: string;
    description: string;
    open: boolean;
    hidden?: boolean;
}
// job -> team -> project -> project.author_id

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