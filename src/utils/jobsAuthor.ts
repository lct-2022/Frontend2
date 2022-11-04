import { Application, Job, User } from "../types";

export const getOwnJobs = (jobs: Job[], authUserId: number) => {
    return jobs.filter(job => job.team.project.author_id === authUserId)
}