import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const currentProjectSelector = createSelector(
    (store: IBaseStore) => store.currentProject,
    project => project,
);

export const currentProjectStagesSelector = createSelector(
    (store: IBaseStore) => store.currentStages,
    stages => stages,
);

export const industriesSelector = createSelector(
    (store: IBaseStore) => store.currentIndustries,
    industries => industries,
);

export const innovationsSelector = createSelector(
    (store: IBaseStore) => store.currentInnovations,
    innovations => innovations,
);