import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularProfilesSelector = createSelector(
    (store: IBaseStore) => store.users.list,
    users => users,
);

export const allProfilesNumSelector = createSelector(
    (store: IBaseStore) => store.users.amount,
    amount => amount,
);