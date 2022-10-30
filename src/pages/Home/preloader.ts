import { getPopularProfiles } from "../../api/passport";
import { getPopularJobs, getPopularProjects } from "../../api/platform";

export async function onLoad() {
    return await Promise.all([
        getPopularProjects(''),
        getPopularJobs(''),
        getPopularProfiles(''),
    ])
    // .then((data) => {
    //     console.log(data);
        
    // })
}