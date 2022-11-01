import { getPopularProfiles } from "../../api/passport";
import { getPopularJobs, getPopularProjects } from "../../api/platform";
import { LIMITS, TOKEN } from "../../utils/consts";

export async function onLoad() {
    console.log('CALL');
    
    return await Promise.all([
        getPopularProjects(LIMITS.PROJECTS),
        getPopularJobs(LIMITS.JOBS),
        getPopularProfiles(TOKEN, LIMITS.PROFILES),
    ])
    .then(data => data);
}