import { Application, Job, Undefinedable, User } from "../types";

export const getOwnJobs = (jobs: Job[], authUserId: Undefinedable<number>) => {
    if (authUserId === undefined) {
        return [];
    }
    return jobs.filter(job => job.team.project.author_id === authUserId);
}