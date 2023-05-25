import NetworkRequestHandler from "./NetworkRequestHandler";

abstract class EndpointCategory {
    protected networkRequestHandler = NetworkRequestHandler.getInstance();
}

export default EndpointCategory;