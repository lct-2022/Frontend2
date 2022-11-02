import { Dispatch } from "react";
import { getJobs, getVacancy } from "../../api/platform";
import { ActiveJobAction, ActiveJobActions } from "../types/activeJob";
import { JobsAction, JobsActions } from "../types/jobs";

export const popularJobsAction = (limit?: number) => {
    return async (dispatch: Dispatch<JobsAction>) => {

        const popularJobsResponse = await getJobs(limit);
        console.log('action =>', popularJobsResponse);
        
        dispatch({
            type: JobsActions.SET_JOBS,
            payload: popularJobsResponse.result,
        });
    }
}

export const getCurrentVacancyAction = (jobId: number) => {
    return async (dispatch: Dispatch<ActiveJobAction>) => {

        const currentVacancyResponse = await getVacancy(jobId);

        dispatch({
            type: ActiveJobActions.SET_ACTIVE_JOB,
            payload: currentVacancyResponse.result,
        });
    }
}