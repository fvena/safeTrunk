import type { SafeTrunkConfig } from "../config/types";
import type { ConsoleUIOptions } from "./types";
import chalk from "chalk";
import ora from "ora";

export class ConsoleUI {
  private config: SafeTrunkConfig;
  private options: ConsoleUIOptions;
  private spinner: ReturnType<typeof ora> | undefined;

  constructor(config: SafeTrunkConfig, options: ConsoleUIOptions = {}) {
    this.config = config;
    this.options = {
      quietMode: false,
      showProgress: true,
      ...options,
    };
  }

  /**
   * Display an info message
   */
  public info(message: string): void {
    if (this.options.quietMode) return;
    console.log(chalk.blue("ℹ"), chalk.blue(message));
  }

  /**
   * Display a success message
   */
  public success(message: string): void {
    if (this.options.quietMode) return;
    console.log(chalk.green("✓"), chalk.green(message));
  }

  /**
   * Display a warning message
   */
  public warning(message: string): void {
    if (this.options.quietMode) return;
    console.log(chalk.yellow("⚠"), chalk.yellow(message));
  }

  /**
   * Display an error message
   */
  public error(message: string): void {
    if (this.options.quietMode) return;
    console.error(chalk.red("✖"), chalk.red(message));
  }

  /**
   * Start a progress spinner
   */
  public startSpinner(message: string): void {
    if (this.options.quietMode || !this.options.showProgress) return;
    this.spinner = ora({
      color: "blue",
      spinner: "dots",
      text: message,
    }).start();
  }

  /**
   * Stop the current spinner
   */
  public stopSpinner(success = true, message?: string): void {
    if (!this.spinner) return;
    if (success) {
      this.spinner.succeed(message);
    } else {
      this.spinner.fail(message);
    }
    this.spinner = undefined;
  }

  /**
   * Display a boxed message
   */
  public box(message: string, type: "error" | "info" | "success" | "warning" = "info"): void {
    if (this.options.quietMode) return;

    const colors = {
      error: chalk.red,
      info: chalk.blue,
      success: chalk.green,
      warning: chalk.yellow,
    };

    const color = colors[type];
    const width = Math.max(80, message.length + 4);
    const padding = " ".repeat((width - message.length - 4) / 2);

    console.log(color("┌" + "─".repeat(width - 2) + "┐"));
    console.log(color("│") + padding + message + padding + color("│"));
    console.log(color("└" + "─".repeat(width - 2) + "┘"));
  }

  /**
   * Display a step result
   */
  public stepResult(name: string, success: boolean, output?: string): void {
    if (this.options.quietMode) return;

    const icon = success ? chalk.green("✓") : chalk.red("✖");
    const color = success ? chalk.green : chalk.red;

    console.log(`${icon} ${color(name)}`);

    if (output && !success && this.config.errorReporting?.showStepOutput) {
      console.log(chalk.gray(output));
    }
  }

  /**
   * Display a progress bar
   */
  public progressBar(current: number, total: number, message: string): void {
    if (this.options.quietMode || !this.options.showProgress) return;

    const percentage = Math.round((current / total) * 100);
    const barLength = 30;
    const filledLength = Math.round((current / total) * barLength);
    const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

    process.stdout.write(
      `\r${message} ${bar} ${String(percentage)}% ${String(current)}/${String(total)}`,
    );
  }

  /**
   * Clear the current line
   */
  public clearLine(): void {
    process.stdout.write("\r\u001B[K");
  }

  /**
   * Display a section header
   */
  public sectionHeader(title: string): void {
    if (this.options.quietMode) return;
    console.log("\n" + chalk.cyan("=".repeat(80)));
    console.log(chalk.cyan(title));
    console.log(chalk.cyan("=".repeat(80)) + "\n");
  }

  /**
   * Display a list of items
   */
  public list(items: string[], type: "bullet" | "number" = "bullet"): void {
    if (this.options.quietMode) return;

    for (const [index, item] of items.entries()) {
      const prefix = type === "bullet" ? "•" : `${String(index + 1)}.`;
      console.log(chalk.gray(prefix), item);
    }
  }
}
