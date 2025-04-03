/**
 * Configuration loader for SafeTrunk
 * @packageDocumentation
 */

import type { SafeTrunkConfig } from "./types";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ConfigurationError } from "../utils/errors";
import { CONFIG_FILES, DOCS_URLS } from "../constants";
import { validateConfig } from "./validator";
import { getDefaultConfig } from "./defaults";

/**
 * Configuration loader class
 */
export class ConfigLoader {
  /**
   * Load configuration from a specific file
   * @param filePath - Path to the configuration file
   * @returns Loaded and validated configuration
   * @throws ConfigurationError If loading or validation fails
   */
  public async load(filePath: string): Promise<SafeTrunkConfig> {
    try {
      const config = await this.loadConfigFile(filePath);
      const mergedConfig = this.mergeWithDefaults(config);
      const validationResult = validateConfig(mergedConfig);

      if (!validationResult.isValid) {
        throw new ConfigurationError(
          "Invalid configuration:\n" +
            validationResult.errors.map((error) => `- ${error}`).join("\n") +
            "\n\n" +
            "For configuration schema reference, see:\n" +
            DOCS_URLS.CONFIG_SCHEMA,
        );
      }

      return mergedConfig;
    } catch (error: unknown) {
      if (error instanceof ConfigurationError) {
        throw error;
      }
      throw new ConfigurationError(
        `Failed to load configuration from ${filePath}\n` +
          "Please ensure:\n" +
          "1. The file exists and has correct permissions\n" +
          "2. The file contains valid configuration\n" +
          "3. For .ts files, ensure TypeScript is properly configured\n" +
          "4. For .js files, ensure the file exports a valid configuration object",
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Load and parse configuration file
   */
  private async loadConfigFile(filePath: string): Promise<Partial<SafeTrunkConfig>> {
    try {
      const extension = path.extname(filePath).slice(1);

      switch (extension) {
        case "js":
        case "ts": {
          const module = (await import(filePath)) as { default: SafeTrunkConfig };
          return module.default;
        }
        case "json": {
          const content = await readFile(filePath, "utf8");
          return JSON.parse(content) as SafeTrunkConfig;
        }
        default: {
          throw new ConfigurationError(
            `Invalid configuration format: ${String(extension)}\n` +
              "Expected one of: .js, .ts, or .json\n\n" +
              "Example valid configuration files:\n" +
              CONFIG_FILES.map((file) => `- ${file}`).join("\n"),
          );
        }
      }
    } catch (error) {
      throw new ConfigurationError(
        `Failed to load configuration file: ${filePath}\n` +
          "Please ensure:\n" +
          "1. The file exists and has correct permissions\n" +
          "2. The file contains valid configuration\n" +
          "3. For .ts files, ensure TypeScript is properly configured\n" +
          "4. For .js files, ensure the file exports a valid configuration object",
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Merge loaded configuration with defaults
   */
  private mergeWithDefaults(config: Partial<SafeTrunkConfig>): SafeTrunkConfig {
    return {
      ...getDefaultConfig(),
      ...config,
      branches: {
        ...getDefaultConfig().branches,
        ...config.branches,
      },
      errorReporting: {
        ...getDefaultConfig().errorReporting,
        ...config.errorReporting,
      },
      feedback: {
        ...getDefaultConfig().feedback,
        ...config.feedback,
      },
    };
  }
}
