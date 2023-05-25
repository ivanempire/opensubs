import axios from "axios";
import CredentialManager from "./CredentialManager";
import * as net from "net";

class NetworkRequestHandler {

    // https://api.opensubtitles.com/api/v1/login

    private static instance: NetworkRequestHandler
    private credentialManager: CredentialManager;

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

    performNetworkCall = async(httpMethod: HttpMethod, endpoint: string, args: any): Promise<any> => {
        console.log(httpMethod);
        const networkCall = await axios({
            method: httpMethod,
            url: "https://api.opensubtitles.com/api/v1/login",
            data: {
                username: "ivanempire",
                password: "password"
            }
        });
        console.log(networkCall);
    }
}

export default NetworkRequestHandler;