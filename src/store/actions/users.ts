import { Dispatch } from "react";
import { getPopularProfiles } from "../../api/passport";
import { UsersAction, UsersActions } from '../types/users';

export const popularProfilesAction = (limit?: number) => {
    return async (dispatch: Dispatch<UsersAction>) => {

        const popularProfilesResponse = await getPopularProfiles(limit);

        dispatch({
            type: UsersActions.SET_USERS,
            payload: popularProfilesResponse.result,
        });
    }
}