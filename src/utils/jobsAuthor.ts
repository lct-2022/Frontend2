import { Application, Job, User } from "../types/common";

export const getOwnJobs = (jobs: Job[], authUserId: number | undefined) => {
    if (authUserId === undefined) {
        return [];
    }
    return jobs.filter(job => job.team.project.author_id === authUserId);
}