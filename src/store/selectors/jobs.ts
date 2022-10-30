import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularJobsSelector = createSelector(
    (store: IBaseStore) => store.jobs.list,
    jobs => jobs,
);

export const allJobsNumSelector = createSelector(
    (store: IBaseStore) => store.jobs.amount,
    amount => amount,
);