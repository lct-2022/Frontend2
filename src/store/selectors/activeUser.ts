import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const isUserAuthorized = createSelector(
    (store: IBaseStore) => store.activeUser,
    user => user,
)