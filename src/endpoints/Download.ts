import {HttpMethod} from "../core/HttpMethod";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";
import CredentialManager from "../core/CredentialManager";
import CONTENT_TYPE_JSON = NetworkHeaders.CONTENT_TYPE_JSON;

class Download {

    private credentialManager: CredentialManager
    private networkRequestHandler: NetworkRequestHandler;

    constructor(credentialManager: CredentialManager, networkRequestHandler: NetworkRequestHandler) {
        this.credentialManager = credentialManager;
        this.networkRequestHandler = networkRequestHandler;
    }

    requestDownload = async(requestParams: RequestDownloadParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.POST,
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

type RequestDownloadParams = {
    file_id: number
    sub_format?: string
    file_name?: string
    in_fps?: number
    out_fps?: number
    timeshift?: number
    force_download?: boolean
}

export default Download;