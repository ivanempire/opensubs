import CredentialManager from "../CredentialManager";

class Authentication {

    private credentialManager: CredentialManager

    constructor(credentialManager: CredentialManager) {
        this.credentialManager = credentialManager;
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

export default Authentication;