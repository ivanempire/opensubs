import NetworkRequestHandler from "./RequestMaker";

abstract class EndpointCategory {
    protected networkRequestHandler = NetworkRequestHandler.getInstance();
}

export default EndpointCategory;