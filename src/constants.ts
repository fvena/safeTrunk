/**
 * Project-wide constants
 * @packageDocumentation
 */

/**
 * Configuration file names in order of precedence
 */
export const CONFIG_FILES = [
  "safetrunk.config.ts",
  "safetrunk.config.json",
  "safetrunk.config.js",
] as const;

/**
 * Error codes for different error types
 */
export const ERROR_CODES = {
  CONFIG: "CONFIG_001",
  FILESYSTEM: "FS_001",
  GIT: "GIT_001",
  PLUGIN: "PLUGIN_001",
  STEP: "STEP_001",
  VALIDATION: "VALIDATION_001",
  WORKFLOW: "WORKFLOW_001",
} as const;

/**
 * Documentation URLs
 */
export const DOCS_URLS = {
  CONFIG: "https://fvena.github.io/safeTrunk/config/overview",
  CONFIG_SCHEMA: "https://fvena.github.io/safeTrunk/config/schema",
  FILESYSTEM: "https://fvena.github.io/safeTrunk/errors/filesystem",
  GIT: "https://fvena.github.io/safeTrunk/errors/git",
  PLUGIN: "https://fvena.github.io/safeTrunk/errors/plugin",
  STEP: "https://fvena.github.io/safeTrunk/errors/step",
  VALIDATION: "https://fvena.github.io/safeTrunk/errors/validation",
  WORKFLOW: "https://fvena.github.io/safeTrunk/errors/workflow",
} as const;

/**
 * Event names for the event system
 */
export const EVENTS = {
  ACHIEVEMENT_UNLOCKED: "achievementUnlocked",
  AFTER_ANALYSIS: "afterAnalysis",
  AFTER_CHECK: "afterCheck",
  AFTER_PULL: "afterPull",
  AFTER_PUSH: "afterPush",
  AFTER_RUN: "afterRun",
  AFTER_STEP: "afterStep",
  BEFORE_ANALYSIS: "beforeAnalysis",
  BEFORE_CHECK: "beforeCheck",
  BEFORE_PULL: "beforePull",
  BEFORE_PUSH: "beforePush",
  BEFORE_RUN: "beforeRun",
  BEFORE_STEP: "beforeStep",
  LEVEL_UP: "levelUp",
  STEP_FAILED: "stepFailed",
} as const;
