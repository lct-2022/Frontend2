import { Job, ProjectData, ProjectStage, UserData } from "../types";

export function lsSaveAuthorizedUser(user: UserData) {
    try {
        localStorage.setItem('authorised_user_ideahunt', JSON.stringify(user));
    } catch(err) {
        // pass
    }
}

export function lsGetAuthorizedUser(): UserData | undefined {
    try {
        const user = localStorage.getItem('authorised_user_ideahunt');
        
        if (user) {
            return JSON.parse(user);
        }

        return;
    } catch(err) {
        // pass
    }
}

export function lsRemoveAuthorizedUser() {
    try {
        localStorage.removeItem('authorised_user_ideahunt');
    } catch(err) {
        // pass
    }
}

export function lsSaveCurrentUser(user: UserData) {
    try {
        localStorage.setItem('current_user_ideahunt', JSON.stringify(user));
    } catch(err) {
        // pass
    }
}

export function lsGetCurrentUser(): UserData | undefined {
    try {
        const user = localStorage.getItem('current_user_ideahunt');
        
        if (user) {
            return JSON.parse(user);
        }

        return;
    } catch(err) {
        // pass
    }
}

export function lsRemoveCurrentUser() {
    try {
        localStorage.removeItem('current_user_ideahunt');
    } catch(err) {
        // pass
    }
}

export function lsSaveCurrentProject(project: ProjectData) {
    try {
        localStorage.setItem('current_project_ideahunt', JSON.stringify(project));
    } catch(err) {
        // pass
    }
}

export function lsGetCurrentProject(): ProjectData | undefined {
    try {
        const project = localStorage.getItem('current_project_ideahunt');
        
        if (project) {
            return JSON.parse(project);
        }

        return;
    } catch(err) {
        // pass
    }
}

export function lsSaveCurrentJob(job: Job) {
    try {
        localStorage.setItem('current_job_ideahunt', JSON.stringify(job));
    } catch(err) {
        // pass
    }
}

export function lsGetCurrentJob(): Job | undefined {
    try {
        const job = localStorage.getItem('current_job_ideahunt');
        
        if (job) {
            return JSON.parse(job);
        }

        return;
    } catch(err) {
        // pass
    }
}