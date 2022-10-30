import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularProjectsSelector = createSelector(
    (store: IBaseStore) => store.projects,
    projects => projects,
);