import { IDataRPC, request, RPCHosts } from "../utils/api";

// rating
export const getRating = async (subject: 'project' | 'user', id: number): Promise<IDataRPC<number>> => {
    return await request({
        method: 'get-rating',
        host: RPCHosts.Ratings,
        params: {
            'subject-type': subject,
            'subject-id': id,
        }
    });
};