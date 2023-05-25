import { UserCredentials } from "./UserCredentials";

class CredentialManager {

    private userCredentials: UserCredentials;

    constructor(username: string, password: string, apiKey: string) {
        this.userCredentials = {
            username: username,
            password: password,
            apiKey: apiKey,
            jwt: null
        }
    }

    updateToken = (newToken: string) => {
        this.userCredentials = { ...this.userCredentials, jwt: newToken };
    }

    getUserCredentials = (): UserCredentials => {
        return this.userCredentials;
    }
}

export default CredentialManager;