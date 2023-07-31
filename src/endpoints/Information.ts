import {HttpMethod} from "../core/HttpMethod";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import ACCEPT_JSON_EXAMPLE = NetworkHeaders.ACCEPT_JSON_EXAMPLE;
import NetworkRequestHandler from "../core/NetworkRequestHandler";
import CredentialManager from "../core/CredentialManager";

class Information {

    private credentialManager: CredentialManager
    private networkRequestHandler: NetworkRequestHandler;

    constructor(credentialManager: CredentialManager, networkRequestHandler: NetworkRequestHandler) {
        this.credentialManager = credentialManager;
        this.networkRequestHandler = networkRequestHandler;
    }

    getSubtitleFormats = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/infos/formats",
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    getLanguages = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/infos/languages",
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    getUserInformation = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/infos/user",
            true,
            {
                ...ACCEPT_JSON,
                "Authorization": `Bearer: ${this.credentialManager.getUserCredentials().jwt}`
            }
        );
    }
}

export default Information;