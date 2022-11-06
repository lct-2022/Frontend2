import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const currentJobSelector = createSelector(
    (store: IBaseStore) => store.currentJob,
    job => job,
);