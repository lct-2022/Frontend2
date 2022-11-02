import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const teamsSelector = createSelector(
    (store: IBaseStore) => store.teams,
    teams => teams || [],
);