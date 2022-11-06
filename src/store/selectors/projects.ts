import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const currentProjectSelector = createSelector(
    (store: IBaseStore) => store.currentProject,
    project => project,
);

export const currentProjectStagesSelector = createSelector(
    (store: IBaseStore) => store.currentProjectStages,
    stages => stages,
);

export const industriesStagesSelector = createSelector(
    (store: IBaseStore) => store.currentIndustries,
    industries => industries,
);

export const innnovationsSelector = createSelector(
    (store: IBaseStore) => store.currentInnovations,
    innovations => innovations,
);