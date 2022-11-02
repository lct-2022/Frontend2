import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularProjectsSelector = createSelector(
    (store: IBaseStore) => store.projects.list,
    projects => projects,
);

export const allProjectsNumSelector = createSelector(
    (store: IBaseStore) => store.projects.list.length,
    amount => amount,
);

// TODO: support identification
export const allProjectsSupportedSelector = createSelector(
    (store: IBaseStore) => store.projects.list.filter(proj => proj.project.synced).length,
    amount => amount,
);

export const currentProjectSelector = createSelector(
    (store: IBaseStore) => store.activeProject,
    ({project, team, vacancies, rating}) => {
        if (!project) {
            return null;
        }

        return {
            project,
            team: team || [],
            openVacancies: vacancies || [],
            rating,
        }
    },
);