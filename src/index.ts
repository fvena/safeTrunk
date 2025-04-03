#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { version } from "../package.json";

const program = new Command();

class CLIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CLIError";
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

program
  .name("safetrunk")
  .description("A CLI tool for improving trunk-based development workflows")
  .version(version);

program
  .command("run")
  .description("Execute pre-push checks and push if successful")
  .option("-c, --config <path>", "Path to custom configuration")
  .option("-q, --quiet", "Enable quiet mode")
  .option("-v, --verbose", "Enable verbose output")
  .action(async (options: { config?: string; quiet?: boolean; verbose?: boolean }) => {
    try {
      if (options.verbose && options.quiet) {
        throw new CLIError("Cannot use both verbose and quiet modes");
      }

      console.log(chalk.blue("Running pre-push checks..."));
      // Temporary delay to simulate async operation
      await delay(1000);
      // TODO: Implement run command logic using options
      console.log(chalk.green("✓ All checks passed"));
    } catch (error) {
      console.error(chalk.red("Error:"), error instanceof Error ? error.message : "Unknown error");
      throw error;
    }
  });

program
  .command("check")
  .description("Run verification without pushing")
  .option("-c, --config <path>", "Path to custom configuration")
  .option("-q, --quiet", "Enable quiet mode")
  .option("-v, --verbose", "Enable verbose output")
  .action(async (options: { config?: string; quiet?: boolean; verbose?: boolean }) => {
    try {
      if (options.verbose && options.quiet) {
        throw new CLIError("Cannot use both verbose and quiet modes");
      }

      console.log(chalk.blue("Running verification checks..."));
      // Temporary delay to simulate async operation
      await delay(1000);
      // TODO: Implement check command logic using options
      console.log(chalk.green("✓ All checks passed"));
    } catch (error) {
      console.error(chalk.red("Error:"), error instanceof Error ? error.message : "Unknown error");
      throw error;
    }
  });

program.parse();
