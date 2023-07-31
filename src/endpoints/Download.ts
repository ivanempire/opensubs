import {HttpMethod} from "../core/HttpMethod";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Download {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    /**
     *   --header 'Accept: application/json' \
     *   --header 'Authorization: Bearer undefined' \
     *   --header 'Content-Type: application/json' \
     *   --data '{
     *   "file_id": 123
     * }'
     */
    requestDownload = async(fileId: number): Promise<any> => {
        await this.networkRequestHandler.performNetworkCall(
            HttpMethod.POST,
            "/download",
            true,
            {...ACCEPT_JSON}
        );
    }
}

export default Download;