import { Dispatch } from "react";
import { getJobs } from "../../api/platform";
import { JobsAction, JobsActions } from "../types/jobs";

export const popularJobsAction = (limit?: number) => {
    return async (dispatch: Dispatch<JobsAction>) => {

        const popularJobsResponse = await getJobs(limit);

        dispatch({
            type: JobsActions.SET_JOBS,
            payload: popularJobsResponse.result,
        });
    }
}