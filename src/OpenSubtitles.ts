import Features from "./endpoints/Features";
import Discover from "./endpoints/Discover";
import Download from "./endpoints/Download";
import Subtitles from "./endpoints/Subtitles";
import Information from "./endpoints/Information";
import CredentialManager from "./core/CredentialManager";
import Authentication from "./endpoints/Authentication";
import NetworkRequestHandler from "./core/NetworkRequestHandler";

export class OpenSubtitles {

    private networkRequestHandler: NetworkRequestHandler

    info: Information
    auth: Authentication
    discover: Discover
    download: Download
    features: Features
    subtitles: Subtitles
    
    constructor(username: string, password: string, apiKey: string) {
        const credentialManager = new CredentialManager(username, password, apiKey)
        this.networkRequestHandler = NetworkRequestHandler.instantiate(credentialManager);

        this.auth = new Authentication(credentialManager);
        this.info = new Information();
        this.discover = new Discover();
        this.download = new Download();
        this.features = new Features();
        this.subtitles = new Subtitles();
    }
}