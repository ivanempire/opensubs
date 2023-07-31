import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import { describe, expect, it } from "@jest/globals";
import testCredentialManager from "./TestCredentialManager";
import { Servers } from "../../src/constants/Servers";

describe("NetworkRequestHandler", () => {
    it("initializes correctly", () => {
        const sut = new NetworkRequestHandler(testCredentialManager, Servers.MOCK);
        expect(sut).not.toBeNull();
    });
});