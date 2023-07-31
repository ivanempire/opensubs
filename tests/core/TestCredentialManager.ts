import CredentialManager from "../../src/core/CredentialManager";

const testCredentialManager = new CredentialManager(
    process.env.OPENSUBS_USERNAME ?? "",
    process.env.OPENSUBS_PASSWORD ?? "",
    process.env.OPENSUBS_APIKEY ?? ""
);

export default testCredentialManager;