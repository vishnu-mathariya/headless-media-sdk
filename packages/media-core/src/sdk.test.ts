import { describe, expect, it } from "vitest";
import { MediaSDK } from "./sdk";

describe("MediaSDK", () => {
  it("requires an API key", () => {
    expect(() => {
      new MediaSDK({
        apiKey: ""
      });
    }).toThrow("Pexels API key is required.");
  });

  it("creates an SDK instance with a valid API key", () => {
    const sdk = new MediaSDK({
      apiKey: "test-api-key"
    });

    expect(sdk).toBeInstanceOf(MediaSDK);
  });

  it("emits download events", () => {
    const sdk = new MediaSDK({
      apiKey: "test-api-key"
    });

    let receivedId: number | undefined;

    sdk.events.on((event) => {
      if (event.type === "download") {
        receivedId = event.mediaId;
      }
    });

    sdk.download(123);

    expect(receivedId).toBe(123);
  });

  it("emits view events", () => {
    const sdk = new MediaSDK({
      apiKey: "test-api-key"
    });

    let receivedId: number | undefined;

    sdk.events.on((event) => {
      if (event.type === "view") {
        receivedId = event.mediaId;
      }
    });

    sdk.view(456);

    expect(receivedId).toBe(456);
  });
});