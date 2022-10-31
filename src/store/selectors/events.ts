import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const evensSelector = createSelector(
    (store: IBaseStore) => store.projects.list,
    projects => projects,
);
