import { RPC_PROTOCOL, RPC_URL, TOKEN } from "./consts";

class API {
    headers: any;
    uri: string;
    timeout?: number;
    body: any;
    protocol: string;

    constructor(host: string, body: any) {
        this.headers = {};
        this.uri = RPC_URL;
        this.body = {};
        this.protocol = RPC_PROTOCOL;
    }

    private getUrl(host: string) {
        return `${this.protocol}://${host}${this.uri}`;
    }
}

interface IRPCRequestArguments {
    method: string, 
    host: string, 
    params?: Object, 
    settings?: {
        authToken: string,
    }
}

export async function request(args: IRPCRequestArguments): Promise<any> {
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
    const res = await response.json();
    return res.result;
}

export enum RPCHosts {
    Passport = 'passport',
    Platform = 'platform',
    Ratings = 'ratings',
    Chat = 'chat',
    Events = 'events',
}