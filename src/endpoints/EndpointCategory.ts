import NetworkRequestHandler from "../core/NetworkRequestHandler";

abstract class EndpointCategory {
    protected networkRequestHandler = NetworkRequestHandler.getInstance();
}

export default EndpointCategory;