import { describe, expect, it } from "vitest";

describe("useMediaSearch", () => {
  it("should be defined", async () => {
    const module = await import("./useMediaSearch");

    expect(module.useMediaSearch).toBeDefined();
  });
});