import Features from "./collections/Features";
import Discover from "./collections/Discover";
import Download from "./collections/Download";
import Subtitles from "./collections/Subtitles";
import NetworkRequestHandler from "./RequestMaker";
import CredentialManager from "./CredentialManager";
import Authentication from "./collections/Authentication";
import Information from "./collections/Information";

class OpenSubtitles {

    private networkRequestHandler: NetworkRequestHandler

    info: Information
    auth: Authentication
    discover: Discover
    download: Download
    features: Features
    subtitles: Subtitles
    
    constructor(username: string, password: string) {
        const credentialManager = new CredentialManager(username, password)
        this.networkRequestHandler = NetworkRequestHandler.instantiate(credentialManager);

        this.auth = new Authentication(credentialManager);
        this.info = new Information();
        this.discover = new Discover();
        this.download = new Download();
        this.features = new Features();
        this.subtitles = new Subtitles();
    }
}

export default OpenSubtitles;