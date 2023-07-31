import axios from "axios";
import { HttpMethod } from "./HttpMethod";
import CredentialManager from "./CredentialManager";
import {Result} from "./Result";
import {Servers} from "../constants/Servers";

class NetworkRequestHandler {

    private credentialManager: CredentialManager;
    private readonly serverAddress: string;

    constructor(credentialManager: CredentialManager, endpoint?: Servers) {
        this.credentialManager = credentialManager;
        if (endpoint == null) {
            this.serverAddress = Servers.PRIMARY;
        } else {
            this.serverAddress = endpoint;
        }
    }

    performNetworkCall = async(httpMethod: HttpMethod, endpoint: string, includeApiKey: boolean, headers: object, data?: object): Promise<Result<any>> => {
        const requestHeaders = {
            ...headers,
            "Api-Key": includeApiKey ? this.credentialManager.getUserCredentials().apiKey : undefined,
        };

        try {
            const networkCall = await axios({
                method: httpMethod,
                headers: requestHeaders,
                url: this.serverAddress + endpoint,
                data: data ? data : null
            });
            return { ok: true, value: networkCall.data };
        } catch (error: any) {
            return { ok: false, error: error };
        }
    }
}

export default NetworkRequestHandler;