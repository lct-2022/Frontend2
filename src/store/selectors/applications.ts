import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const applicationsSelector = createSelector(
    (store: IBaseStore) => store.applications,
    applications => applications || [],
);