import { Empty, Job, ProjectData, UserData } from "../types/common";

export function lsSaveCurrentUser(user: UserData) {
    try {
        localStorage.setItem('current_user_ideahunt', JSON.stringify(user));
    } catch(err) {
        console.info(err);
    }
}

export function lsGetCurrentUser(): Empty<UserData> {
    try {
        const user = localStorage.getItem('current_user_ideahunt');
        
        if (user) {
            return JSON.parse(user);
        }
    } catch(err) {
        console.info(err);
    }
}

export function lsRemoveCurrentUser() {
    try {
        localStorage.removeItem('current_user_ideahunt');
    } catch(err) {
        console.info(err);
    }
}

export function lsSaveCurrentProject(project: ProjectData) {
    try {
        localStorage.setItem('current_project_ideahunt', JSON.stringify(project));
    } catch(err) {
        console.info(err);
    }
}

export function lsGetCurrentProject(): Empty<ProjectData> {
    try {
        const project = localStorage.getItem('current_project_ideahunt');
        
        if (project) {
            return JSON.parse(project);
        }
    } catch(err) {
        console.info(err);
    }
}

export function lsSaveCurrentJob(job: Job) {
    try {
        localStorage.setItem('current_job_ideahunt', JSON.stringify(job));
    } catch(err) {
        console.info(err);
    }
}

export function lsGetCurrentJob(): Empty<Job> {
    try {
        const job = localStorage.getItem('current_job_ideahunt');
        
        if (job) {
            return JSON.parse(job);
        }
    } catch(err) {
        console.info(err);
    }
}