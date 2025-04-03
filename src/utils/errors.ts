import { DOCS_URLS } from "../constants";

/**
 * Base error class for SafeTrunk
 * @packageDocumentation
 */

export class SafeTrunkError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly documentation?: string,
    public override readonly cause?: Error,
  ) {
    super(message);
    this.name = "SafeTrunkError";
  }

  /**
   * Get a formatted error message with solution hints
   */
  public getFormattedMessage(): string {
    let message = `Error [${this.code}]: ${this.message}`;

    if (this.documentation) {
      message += `\n\nFor more information, see: ${this.documentation}`;
    }

    if (this.cause) {
      message += `\n\nCaused by: ${this.cause.message}`;
    }

    return message;
  }
}

export class ConfigurationError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "CONFIG_001", DOCS_URLS.CONFIG, cause);
    this.name = "ConfigurationError";
  }
}

export class GitError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "GIT_001", DOCS_URLS.GIT, cause);
    this.name = "GitError";
  }
}

export class StepExecutionError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "STEP_001", DOCS_URLS.STEP, cause);
    this.name = "StepExecutionError";
  }
}

export class PluginError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "PLUGIN_001", DOCS_URLS.PLUGIN, cause);
    this.name = "PluginError";
  }
}

export class WorkflowError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "WORKFLOW_001", DOCS_URLS.WORKFLOW, cause);
    this.name = "WorkflowError";
  }
}

export class ValidationError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "VALIDATION_001", DOCS_URLS.VALIDATION, cause);
    this.name = "ValidationError";
  }
}

export class FileSystemError extends SafeTrunkError {
  constructor(message: string, cause?: Error) {
    super(message, "FS_001", DOCS_URLS.FILESYSTEM, cause);
    this.name = "FileSystemError";
  }
}
