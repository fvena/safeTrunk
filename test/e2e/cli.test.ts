import type { ExecaError } from "execa";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { execa } from "execa";

describe("CLI E2E Tests", () => {
  const cliPath = path.join(process.cwd(), "dist/index.js");

  it("should show help message when no arguments provided", async () => {
    try {
      await execa("node", [cliPath]);

      // Commander will throw an error if no arguments are provided
      expect(false).toBe(true);
    } catch (error) {
      expect((error as ExecaError).stderr).toContain("Usage:");
      expect((error as ExecaError).stderr).toContain("Commands:");
      expect((error as ExecaError).exitCode).toBe(1);
    }
  });

  it("should show version when --version is provided", async () => {
    const { stdout } = await execa("node", [cliPath, "--version"]);
    expect(stdout).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("should run checks when --check is provided", async () => {
    const { exitCode, stdout } = await execa("node", [cliPath, "check"], {
      reject: false,
    });

    expect(exitCode).toBe(0);
    expect(stdout).toContain("Running verification checks...");
    expect(stdout).toContain("All checks passed");
  });
});
