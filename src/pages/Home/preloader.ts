import { getPopularProfiles } from "../../api/passport";
import { getJobs, getProjects } from "../../api/platform";
import { LIMITS } from "../../utils/consts";

export async function onLoad() {
    return await Promise.all([
        getProjects(LIMITS.PROJECTS),
        getJobs(LIMITS.JOBS),
        getPopularProfiles(LIMITS.PROFILES),
    ])
        .then(data => data);
}