import { request, RPCHosts } from "../../utils/api";
import { TOKEN } from "../../utils/consts";

export const getPopularProfiles = async (token: string, limit?: number): Promise<any> => {
    return await request({
        method: 'popular-profiles',
        host: RPCHosts.Passport,
        settings: {
            authToken: token
        },
        ...(limit && {
            params: {limit}
        })
    });
};