import { getPopularProfiles } from "../../api/passport";
import { getPopularJobs, getPopularProjects } from "../../api/platform";
import { LIMITS } from "../../utils/consts";

export async function onLoad() {
    console.log('CALL');
    
    return await Promise.all([
        getPopularProjects('', LIMITS.PROJECTS),
        getPopularJobs('', LIMITS.JOBS),
        getPopularProfiles('', LIMITS.PROFILES),
    ])
    .then(data => data);
}