import axios from "axios";
import { HttpMethod } from "./HttpMethod";
import CredentialManager from "./CredentialManager";

class NetworkRequestHandler {

    private static instance: NetworkRequestHandler
    private credentialManager: CredentialManager;
    private static SERVER_BASE_URL = "https://api.opensubtitles.com/api/v1"

    private constructor(credentialManager: CredentialManager) {
        this.credentialManager = credentialManager;
    }

    public static instantiate(credentialManager: CredentialManager): NetworkRequestHandler {
        if (!NetworkRequestHandler.instance) {
            NetworkRequestHandler.instance = new NetworkRequestHandler(credentialManager);
        }
        return NetworkRequestHandler.instance;
    }

    public static getInstance(): NetworkRequestHandler {
        if (!NetworkRequestHandler.instance) {
            throw new Error("Null instance, did you call instantiate(credentialManager: CredentialManager) first?");
        }
        return NetworkRequestHandler.instance;
    }

    performNetworkCall = async(httpMethod: HttpMethod, endpoint: string, args?: any): Promise<any> => {
        const userCreds = this.credentialManager.getUserCredentials();
        const networkCall = await axios({
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
                "Api-Key": userCreds.apiKey,
            },
            data: {
                username: userCreds.username,
                password: userCreds.password
            },
            url: NetworkRequestHandler.SERVER_BASE_URL + endpoint
        });
        if (networkCall.data.status == "200") {
            this.credentialManager.updateToken(networkCall.data.token);
        }
    }
}

export default NetworkRequestHandler;