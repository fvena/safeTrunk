/**
 * Tests for the configuration management system
 * @packageDocumentation
 */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ConfigLoader } from "../../src/config/loader";
import { getDefaultConfig } from "../../src/config/defaults";
import { ConfigurationError } from "../../src/utils/errors";

describe("Configuration Management System", () => {
  const testDirectory = path.join(process.cwd(), "test-config");
  let configLoader: ConfigLoader;

  beforeEach(async () => {
    await mkdir(testDirectory, { recursive: true });
    configLoader = new ConfigLoader();
  });

  afterEach(async () => {
    await rm(testDirectory, { force: true, recursive: true });
  });

  describe("ConfigLoader", () => {
    it("should load JSON configuration file", async () => {
      const config = {
        branches: {
          exclude: ["dev/*"],
          include: ["main"],
        },
        prePushSteps: [
          {
            command: "npm test",
            name: "test",
          },
        ],
      };

      await writeFile(
        path.join(testDirectory, "safetrunk.config.json"),
        JSON.stringify(config, undefined, 2),
      );

      const loadedConfig = await configLoader.load(
        path.join(testDirectory, "safetrunk.config.json"),
      );

      expect(loadedConfig.branches).toEqual(config.branches);
      expect(loadedConfig.prePushSteps).toEqual(config.prePushSteps);
    });

    it("should load TypeScript/JavaScript configuration file", async () => {
      const config = {
        branches: {
          exclude: ["dev/*"],
          include: ["main"],
        },
        prePushSteps: [
          {
            command: "npm test",
            name: "test",
          },
        ],
      };

      await writeFile(
        path.join(testDirectory, "safetrunk.config.ts"),
        `export default ${JSON.stringify(config, undefined, 2)};`,
      );

      const loadedConfig = await configLoader.load(path.join(testDirectory, "safetrunk.config.ts"));

      expect(loadedConfig.branches).toEqual(config.branches);
      expect(loadedConfig.prePushSteps).toEqual(config.prePushSteps);
    });

    it("should merge configuration with defaults", async () => {
      const config = {
        branches: {
          include: ["development"],
        },
      };

      await writeFile(
        path.join(testDirectory, "safetrunk.config.json"),
        JSON.stringify(config, undefined, 2),
      );

      const loadedConfig = await configLoader.load(
        path.join(testDirectory, "safetrunk.config.json"),
      );

      expect(loadedConfig.branches?.include).toEqual(["development"]);
      expect(loadedConfig.branches?.exclude).toEqual(getDefaultConfig().branches?.exclude);
      expect(loadedConfig.feedback).toEqual(getDefaultConfig().feedback);
    });

    it("should throw ConfigLoadError for invalid configuration", async () => {
      const invalidConfig = {
        branches: {
          include: "main", // Should be an array
        },
      };

      await writeFile(
        path.join(testDirectory, "safetrunk.config.json"),
        JSON.stringify(invalidConfig, undefined, 2),
      );

      await expect(
        configLoader.load(path.join(testDirectory, "safetrunk.config.json")),
      ).rejects.toThrow(ConfigurationError);
    });

    it("should throw ConfigurationError when no config file exists", async () => {
      await expect(configLoader.load(testDirectory)).rejects.toThrow(ConfigurationError);
    });
  });
});
