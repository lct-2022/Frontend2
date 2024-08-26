import { Dispatch } from "react";
import { getVacancy } from "../../api/platform";
import { Application } from "../../types/common";
import { currentJobAction, currentJobActions } from "../types/currentJob";
import { ApplicationsActions, SetApplications } from "../types/applications";
import { lsSaveCurrentJob } from "../../utils/storage";

export const getCurrentVacancyAction = (jobId: number) => {
    return async (dispatch: Dispatch<currentJobAction>) => {

        const currentVacancyResponse = await getVacancy(jobId);

        if (currentVacancyResponse) {
            lsSaveCurrentJob(currentVacancyResponse)
        }

        dispatch({
            type: currentJobActions.SET_ACTIVE_JOB,
            payload: currentVacancyResponse,
        });
    }
}

export const getJobApplicationsAction = (applications: Application[]) => {
    return async (dispatch: Dispatch<SetApplications>) => {

        dispatch({
            type: ApplicationsActions.SET_APPLICATIONS,
            payload: applications,
        });
    }
}