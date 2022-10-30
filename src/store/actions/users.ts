import { Dispatch } from "react";
import { getPopularProfiles } from "../../api/passport";
import { UsersAction, UsersActions } from '../types/users';

export const popularProfilesAction = (token: string, limit?: number) => {
    return async (dispatch: Dispatch<UsersAction>) => {

        const popularProfilesResponse = await getPopularProfiles(token, limit);

        dispatch({
            type: UsersActions.SET_USERS,
            payload: popularProfilesResponse.result,
        });
    }
}