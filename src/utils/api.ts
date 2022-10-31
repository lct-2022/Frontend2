// class API {
    // headers: any;
    // uri: string;
    // timeout?: number;
    // body: any;
    // protocol: string;

    // constructor(host: string, body: any) {
    //     this.headers = {};
    //     this.uri = RPC_URL;
    //     this.body = {};
    //     this.protocol = RPC_PROTOCOL;
    // }

    // private getUrl(host: string) {
    //     return `${this.protocol}://${host}${this.uri}`;
    // }
// }

export interface IDataRPC<D> {
    result: D,
    jsonrpc: string,
    id: number,
}

interface IRPCRequestArguments {
    method: string, 
    host: string, 
    params?: Object, 
    settings?: {
        authToken: string,
    }
}

export async function request(args: IRPCRequestArguments): Promise<IDataRPC<any>> {
    const {method, host, params, settings} = args;

    const url = `https://${host}.dev.lct.40ants.com`;

    const body = {
        jsonrpc: '2.0',
        method,
        params: params || {},
        id: 0,
    }

    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (settings?.authToken) {
        headers.set('Authorization', settings.authToken);
    }

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error();
    }
    
    const result = await response.json();
    return result;
}

export enum RPCHosts {
    Passport = 'passport',
    Platform = 'platform',
    Ratings = 'ratings',
    Chat = 'chat',
    Events = 'events',
}

export const RPCMethods = {
    Passport: 'passport',
    Platform: 'platform',
    Ratings: 'ratings',
    Chat: 'chat',
    Events: 'events',
}