import { Dispatch } from "react";
import { getPopularJobs, getApplications, getVacancy } from "../../api/platform";
import { Application } from "../../types";
import { currentJobAction, currentJobActions } from "../types/currentJob";
import { ApplicationsActions, SetApplications } from "../types/applications";
import { JobsAction, JobsActions } from "../types/jobs";

export const popularJobsAction = (limit?: number) => {
    return async (dispatch: Dispatch<JobsAction>) => {

        const popularJobsResponse = await getPopularJobs(limit);
        
        dispatch({
            type: JobsActions.SET_JOBS,
            payload: popularJobsResponse,
        });
    }
}

export const getCurrentVacancyAction = (jobId: number) => {
    return async (dispatch: Dispatch<currentJobAction>) => {

        const currentVacancyResponse = await getVacancy(jobId);

        dispatch({
            type: currentJobActions.SET_ACTIVE_JOB,
            payload: currentVacancyResponse,
        });
    }
}

export const getJobApplicationsAction = (applications: Application[] | null) => {
    return async (dispatch: Dispatch<SetApplications>) => {

        dispatch({
            type: ApplicationsActions.SET_APPLICATIONS,
            payload: applications || [],
        });
    }
}