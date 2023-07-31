import { Result } from "../core/Result";
import { HttpMethod } from "../core/HttpMethod";
import CredentialManager from "../core/CredentialManager";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import CONTENT_TYPE_JSON = NetworkHeaders.CONTENT_TYPE_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Authentication {

    private credentialManager: CredentialManager
    private networkRequestHandler: NetworkRequestHandler;

    constructor(credentialManager: CredentialManager, networkRequestHandler: NetworkRequestHandler) {
        this.credentialManager = credentialManager;
        this.networkRequestHandler = networkRequestHandler;
    }

    async login(): Promise<any> {
        const userCredentials = this.credentialManager.getUserCredentials();
        try {
            const loginResponse: Result<any> = await this.networkRequestHandler.performNetworkCall(
                HttpMethod.POST,
                "/login",
                true,
                {
                    ...ACCEPT_JSON, ...CONTENT_TYPE_JSON
                },
                {
                    "username": userCredentials.username,
                    "password": userCredentials.password
                }
            );
            if (loginResponse.ok) {
                this.credentialManager.updateToken(loginResponse.value.token);
            }
            return loginResponse;
        } catch (error) {
            console.log("Error executing Authentication#login");
            console.log(error);
        }
    }

    async logout(): Promise<any> {
        try {
            const logoutResponse: Result<any> = await this.networkRequestHandler.performNetworkCall(
                HttpMethod.DELETE,
                "/logout",
                true,
                {
                    ...ACCEPT_JSON,
                    "Authorization": `Bearer: ${this.credentialManager.getUserCredentials().jwt}`
                }
            );
            if (logoutResponse.ok) {
                this.credentialManager.updateToken(null);
            }
            return logoutResponse;
        } catch (error) {
            console.log("Error executing Authentication#logout");
            console.log(error);
        }
    }
}

export default Authentication;