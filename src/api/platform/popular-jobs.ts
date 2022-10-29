import { request } from '../../utils/api';
import { RPCHosts } from "../../utils/api";

export const getPopularJobs = async (token: string): Promise<any> => {
    return await request({
        method: 'popular-jobs',
        host: RPCHosts.Platform,
        settings: {
            authToken: token
        },
    });
};