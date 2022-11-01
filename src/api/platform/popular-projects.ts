import { request, RPCHosts } from "../../utils/api";
import { TOKEN } from "../../utils/consts";

export const getProfiles = async (token: string) => {
    return await request({
        method: 'popular-profiles',
        host: RPCHosts.Passport,
        settings: {
            authToken: token
        },
    });
};
