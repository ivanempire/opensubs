import axios from "axios";
import CredentialManager from "./CredentialManager";
import {Servers} from "../constants/Servers";
import {HttpMethods, Result} from "./types";

/**
 * Responsible for calling the OpenSubtitles API. Every library method is a fancy wrapper
 * around this class in order to pass in the necessary information.
 */
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

    /**
     * Perform the actual network request, and wrap the return object into a Result type.
     *
     * @param httpMethod {HttpMethods} To use for the API call.
     * @param endpoint OpenSubtitles API endpoint to call, starts with a slash.
     * @param includeApiKey Flag indicating if the API key should be included in the headers.
     * @param headers Object of all headers to include in the request.
     * @param data Data object to send in the body of the request.
     * @return {Result} wrapped response from all endpoint requests.
     */
    performNetworkCall = async(httpMethod: HttpMethods, endpoint: string, includeApiKey: boolean, headers: object, data?: object): Promise<Result<any>> => {
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