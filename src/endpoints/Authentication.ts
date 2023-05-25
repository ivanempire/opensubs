import { HttpMethod } from "../core/HttpMethod";
import EndpointCategory from "./EndpointCategory";
import CredentialManager from "../core/CredentialManager";

class Authentication extends EndpointCategory {

    private credentialManager: CredentialManager

    constructor(credentialManager: CredentialManager) {
        super();
        this.credentialManager = credentialManager;
    }

    async login(): Promise<any> {
        const requestResponse = await this.networkRequestHandler.performNetworkCall(
            HttpMethod.POST,
            "/login",
        );
    }

    async logout(): Promise<any> {
        const requestResponse = await this.networkRequestHandler.performNetworkCall(
            HttpMethod.DELETE,
            "/logout"
        );
    }
}

export default Authentication;