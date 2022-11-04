import { Vote } from "../types";
import { request, RPCHosts } from "../utils/api";

// rating
export const vote = async (method: 'vote' | 'get_vote', subjectType: 'project' | 'user', subjectId: number, token: string): Promise<Vote> => {
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

export const getRating = async (subjectType: 'project' | 'user', subjectId: number): Promise<number> => {
    return await request({
        method: 'get_rating',
        host: RPCHosts.Ratings,
        params: {
            subject_type: subjectType,
            subject_id: subjectId,
        }
    });
};


