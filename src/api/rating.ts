import { Empty, Vote } from "../types/common";
import { request, RPCHosts } from "../utils/api";

interface IVoteArgs {
    method: 'vote' | 'get_vote',
    subjectType: 'project' | 'user',
    subjectId: number;
    token: string;
}

// rating
export const vote = async (voteArgs: IVoteArgs): Promise<Empty<Vote>> => {
    const {method, subjectId, subjectType, token} = voteArgs;
    return await request({
        method,
        host: RPCHosts.Rating,
        params: {
            subject_type: subjectType,
            subject_id: subjectId,
        },
        settings: {
            authToken: token,
        }
    });
};

export const getRating = async (subjectType: 'project' | 'user', subjectId: number): Promise<Empty<number>> => {
    return await request({
        method: 'get_rating',
        host: RPCHosts.Rating,
        params: {
            subject_type: subjectType,
            subject_id: subjectId,
        }
    });
};


