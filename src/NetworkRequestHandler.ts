import axios from "axios";
import CredentialManager from "./CredentialManager";

class NetworkRequestHandler {

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
        // axios({
        //     method: httpMethod,
        //     url: '/user/12345',
        //     data: {
        //         firstName: 'Fred',
        //         lastName: 'Flintstone'
        //     }
        // });
    }
}

export default NetworkRequestHandler;