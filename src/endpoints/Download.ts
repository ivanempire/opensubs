import {HttpMethods} from "../core/types";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";
import CredentialManager from "../core/CredentialManager";
import CONTENT_TYPE_JSON = NetworkHeaders.CONTENT_TYPE_JSON;
import { RequestDownloadParams } from "../core/types";

class Download {

    private credentialManager: CredentialManager
    private networkRequestHandler: NetworkRequestHandler;

    constructor(credentialManager: CredentialManager, networkRequestHandler: NetworkRequestHandler) {
        this.credentialManager = credentialManager;
        this.networkRequestHandler = networkRequestHandler;
    }

    /**
     * Request the download URL for a certain subtitle. Subtitle file in the temporary URL will be UTF-8 encoded.
     * @param requestParams {RequestDownloadParams} to use for the download request
     * @return {Result} wrapped response from requestDownload endpoint
     */
    requestDownload = async(requestParams: RequestDownloadParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.POST,
            "/download",
            true,
            {
                ...ACCEPT_JSON,
                ...CONTENT_TYPE_JSON,
                "Authorization": `Bearer: ${this.credentialManager.getUserCredentials().jwt}`
            },
            requestParams
        );
    }
}

export default Download;