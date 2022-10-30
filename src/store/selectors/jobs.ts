import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularJobsSelector = createSelector(
    (store: IBaseStore) => store.jobs,
    jobs => jobs,
);