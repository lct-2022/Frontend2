import { getProfiles } from "../../api/passport";
import { getPopularJobs, getPopularProjects } from "../../api/platform";
import { LIMITS } from "../../utils/consts";

export async function onLoad() {
    return await Promise.all([
        getPopularProjects(LIMITS.PROJECTS),
        getPopularJobs(LIMITS.JOBS),
        getProfiles(LIMITS.PROFILES),
    ])
        .then(data => data);
}