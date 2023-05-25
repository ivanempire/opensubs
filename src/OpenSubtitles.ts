import Models from "./collections/Models";
import Discover from "./collections/Discover";
import Download from "./collections/Download";
import Subtitles from "./collections/Subtitles";
import Features from "./collections/Features";
import NetworkRequestHandler from "./RequestMaker";
import CredentialManager from "./CredentialManager";
import Authentication from "./collections/Authentication";

class OpenSubtitles {

    private networkRequestHandler: NetworkRequestHandler

    auth: Authentication
    discover: Discover
    download: Download
    features: Features
    models: Models
    subtitles: Subtitles
    
    constructor(username: string, password: string) {
        const credentialManager = new CredentialManager(username, password)
        this.networkRequestHandler = NetworkRequestHandler.instantiate(credentialManager);

        this.auth = new Authentication(credentialManager);
        this.discover = new Discover();
        this.download = new Download();
        this.features = new Features();
        this.models = new Models();
        this.subtitles = new Subtitles();
    }
}

export default OpenSubtitles;