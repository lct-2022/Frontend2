import { getPopularProfiles } from "../../api/passport";
import { getPopularJobs, getPopularProjects } from "../../api/platform";
import { LIMITS } from "../../utils/consts";

export async function onLoad() {
    return await Promise.all([
        getPopularProjects('', LIMITS.PROJECTS),
        getPopularJobs('', LIMITS.PROJECTS),
        getPopularProfiles('', LIMITS.PROJECTS),
        // my-profile
    ])
    .then(data => data);
}