import { Job, User } from "../types";

export const getJobAuthor = (jobs: Job[], authUserId: number) => {
    jobs.forEach(job => {
        job.team.project.project.author_id
    });
}