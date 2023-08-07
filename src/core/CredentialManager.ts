/**
 * Handles user credentials throughout the lifecycle of library usage, internal-only.
 */
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

    /**
     * Update the user JWT with a new value, or clear it.
     * @param newToken Nullable value for the new user JWT.
     */
    updateToken = (newToken: string|null) => {
        this.userCredentials = { ...this.userCredentials, jwt: newToken };
    }

    /**
     * Grab the user credentials to obtain the JWT for an API call.
     * @return {UserCredentials} currently in store.
     */
    getUserCredentials = (): UserCredentials => {
        return this.userCredentials;
    }
}

/**
 * Represents user credentials for authentication, internal-only.
 */
type UserCredentials = {
    username: string,
    password: string,
    apiKey: string,
    // JWT is updated on login/logout calls, is not required for most endpoint requests
    jwt: string|null
}

export default CredentialManager;