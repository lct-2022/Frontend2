import { Dispatch } from "react";
import { getJobs, getApplications, getVacancy } from "../../api/platform";
import { Application } from "../../types";
import { ActiveJobAction, ActiveJobActions } from "../types/activeJob";
import { ApplicationsActions, SetApplications } from "../types/applications";
import { JobsAction, JobsActions } from "../types/jobs";

export const popularJobsAction = (limit?: number) => {
    return async (dispatch: Dispatch<JobsAction>) => {

        const popularJobsResponse = await getJobs(limit);
        console.log('action =>', popularJobsResponse);
        
        dispatch({
            type: JobsActions.SET_JOBS,
            payload: popularJobsResponse,
        });
    }
}

export const getCurrentVacancyAction = (jobId: number) => {
    return async (dispatch: Dispatch<ActiveJobAction>) => {

        const currentVacancyResponse = await getVacancy(jobId);

        dispatch({
            type: ActiveJobActions.SET_ACTIVE_JOB,
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