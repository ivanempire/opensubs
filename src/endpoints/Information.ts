import {HttpMethods} from "../core/types";
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

    /**
     * Get a list of subtitle formats supported by OpenSubtitles.
     * @return {Result} wrapped response from getSubtitleFormats endpoint.
     */
    getSubtitleFormats = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/infos/formats",
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    /**
     * Get a list of subtitle languages supported by OpenSubtitles.
     * @return {Result} wrapped response from getLanguages endpoint.
     */
    getLanguages = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/infos/languages",
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    /**
     * Get the current user's information like various quotas, user ID, membership level.
     * @return {Result} wrapped response from getUserInformation endpoint.
     */
    getUserInformation = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
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