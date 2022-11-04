import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";
import { DEFAULT_AVATAR } from "../../utils/consts";

export const currentUserSelector = createSelector(
    (store: IBaseStore) => store.activeUser,
    user => {
        return user
        // return {...user, admin: user?.id === 26 ? true : user?.admin}
    },
)

export const usersAvatarSelector = createSelector(
    (store: IBaseStore) => store.activeUser?.["avatar_url"],
    avatarUrl => avatarUrl || DEFAULT_AVATAR,
)

export const popularProfilesSelector = createSelector(
    (store: IBaseStore) => store.users.list,
    users => users || [],
);

export const shownProfileSelector = createSelector(
    (store: IBaseStore) => store.shownUser,
    user => user,
);