import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularProfilesSelector = createSelector(
    (store: IBaseStore) => store.users,
    users => users,
);