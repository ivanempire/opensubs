import {HttpMethods, Result} from "../core/types";
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

    /**
     * Log the current user in to set the JWT.
     * @return {Result} wrapped response from login endpoint.
     */
    async login(): Promise<any> {
        const userCredentials = this.credentialManager.getUserCredentials();
        try {
            const loginResponse: Result<any> = await this.networkRequestHandler.performNetworkCall(
                HttpMethods.POST,
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

    /**
     * Log the current user out and reset the JWT.
     * @return {Result} wrapped response from logout endpoint.
     */
    async logout(): Promise<any> {
        try {
            const logoutResponse: Result<any> = await this.networkRequestHandler.performNetworkCall(
                HttpMethods.DELETE,
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