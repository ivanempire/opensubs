import Features from "./collections/Features";
import NetworkRequestHandler from "./RequestMaker";
import CredentialManager from "./CredentialManager";
import Models from "./collections/Models";

class OpenSubtitles {

    private networkRequestHandler: NetworkRequestHandler

    features: Features
    models: Models
    
    constructor(username: string, password: string) {
        const credentialManager = new CredentialManager(username, password)
        this.networkRequestHandler = NetworkRequestHandler.instantiate(credentialManager);

        this.features = new Features();
        this.models = new Models();
    }



}

export default OpenSubtitles;