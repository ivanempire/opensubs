import BaseClass from "./BaseClass";

class Authentication extends BaseClass {

    ENDPOINT_URL: string;

    constructor() {
        super();
        // Authentication is just at /login and /logout
        this.ENDPOINT_URL = "";
    }

    async login(): Promise<any> {
        const requestResponse = await this.performNetworkCall(
            HttpMethod.POST,
            "/login",
            {
                "username": "",
                "password": ""
            }
        );
    }

    async logout(): Promise<any> {
        const requestResponse = await this.performNetworkCall(
            HttpMethod.DELETE,
            "/logout"
        );
    }
}