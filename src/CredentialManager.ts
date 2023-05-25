class CredentialManager {

    private userToken: string|null = null;

    private username: string;
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    updateToken = (newToken: string) => {
        this.userToken = newToken;
    }

}

export default CredentialManager;