import Features from "./endpoints/Features";
import Discover from "./endpoints/Discover";
import Download from "./endpoints/Download";
import Subtitles from "./endpoints/Subtitles";
import Information from "./endpoints/Information";
import CredentialManager from "./core/CredentialManager";
import Authentication from "./endpoints/Authentication";
import NetworkRequestHandler from "./core/NetworkRequestHandler";
import {Servers} from "./constants/Servers";
import Utilities from "./endpoints/Utilities";

export class OpenSubtitles {

    info: Information
    auth: Authentication
    discover: Discover
    download: Download
    features: Features
    subtitles: Subtitles
    utilities: Utilities
    
    constructor(username: string, password: string, apiKey: string, server?: Servers) {
        const credentialManager = new CredentialManager(username, password, apiKey)
        const networkRequestHandler = new NetworkRequestHandler(credentialManager, server);

        this.auth = new Authentication(credentialManager, networkRequestHandler);
        this.info = new Information(networkRequestHandler);
        this.discover = new Discover(networkRequestHandler);
        this.download = new Download(credentialManager, networkRequestHandler);
        this.features = new Features(networkRequestHandler);
        this.subtitles = new Subtitles(networkRequestHandler);
        this.utilities = new Utilities(networkRequestHandler);
    }
}