/**
 *
 */
abstract class BaseClass {
    private readonly BASE_URL = "https://api.opensubtitles.com/api/v1";

    ENDPOINT_URL: string;

    protected async performNetworkCall(httpMethod: HttpMethod, endpoint: string, data?: any): Promise<any> {

    }
}

export default BaseClass;