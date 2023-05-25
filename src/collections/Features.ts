import NetworkRequestHandler from "../RequestMaker";

abstract class EndpointCategory {
    protected networkRequestHandler = NetworkRequestHandler.getInstance();
}

class Features extends EndpointCategory {
    constructor() {
        super();
    }
}

export default Features;