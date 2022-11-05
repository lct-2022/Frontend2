import { Undefinedable, Vote } from "../types";
import { request, RPCHosts } from "../utils/api";

interface voteArgs {
    method: 'vote' | 'get_vote',
    subjectType: 'project' | 'user',
    subjectId: number;
    token: string;

}
// rating
export const vote = async (voteArgs: voteArgs): Promise<Undefinedable<Vote>> => {
    const {method, subjectId, subjectType, token} = voteArgs;
    return await request({
        method,
        host: RPCHosts.Ratings,
        params: {
            subject_type: subjectType,
            subject_id: subjectId,
        },
        settings: {
            authToken: token,
        }
    });
};

export const getRating = async (subjectType: 'project' | 'user', subjectId: number): Promise<Undefinedable<number>> => {
    return await request({
        method: 'get_rating',
        host: RPCHosts.Ratings,
        params: {
            subject_type: subjectType,
            subject_id: subjectId,
        }
    });
};


