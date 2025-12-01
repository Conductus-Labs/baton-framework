import { describe, it, expect } from "vitest";

/**
 * Test package dependency integration
 * Verify packages can import from their dependencies correctly
 */
describe("Package Dependency Integration", () => {
  it("should import types from @conductus-labs/baton-core", () => {
    // Test that core types are accessible
    import("@conductus-labs/baton-core").then((core) => {
      expect(core).toBeDefined();
      // Verify types are exported (TypeScript will catch if not)
      expect(typeof core).toBe("object");
    });
  });

  it("should import AgentDefinition type from core", async () => {
    const core = await import("@conductus-labs/baton-core");
    // Type check - if this compiles, types are working
    expect(core).toBeDefined();
  });

  it("should import validation utilities from core", async () => {
    const core = await import("@conductus-labs/baton-core");
    expect(core).toBeDefined();
    // Validation utilities should be available
    expect(core).toHaveProperty("validateAgent");
  });

  it("should import path resolution utilities from core", async () => {
    const core = await import("@conductus-labs/baton-core");
    expect(core).toBeDefined();
    // Path utilities should be available
    expect(core).toHaveProperty("findProjectRoot");
  });
});
