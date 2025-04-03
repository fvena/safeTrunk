/**
 * Configuration validator for SafeTrunk
 * @packageDocumentation
 */

import type { SafeTrunkConfig, Step, ValidationResult } from "./types";

/**
 * Validate a step configuration
 * @param step - Step configuration to validate
 * @returns Validation errors if any
 */
function validateStep(step: Step): string[] {
  const errors: string[] = [];

  if (!step.name) {
    errors.push("Step name is required");
  } else if (typeof step.name !== "string") {
    errors.push("Step name must be a string");
  }

  if (!step.command) {
    errors.push("Step command is required");
  } else if (typeof step.command !== "string") {
    errors.push("Step command must be a string");
  }

  if (step.hideOutput !== undefined && typeof step.hideOutput !== "boolean") {
    errors.push("Step hideOutput must be a boolean");
  }

  if (step.parallel !== undefined && typeof step.parallel !== "boolean") {
    errors.push("Step parallel must be a boolean");
  }

  if (step.failOnError !== undefined && typeof step.failOnError !== "boolean") {
    errors.push("Step failOnError must be a boolean");
  }

  if (step.branches) {
    if (step.branches.include && !Array.isArray(step.branches.include)) {
      errors.push("Step branches.include must be an array");
    }
    if (step.branches.exclude && !Array.isArray(step.branches.exclude)) {
      errors.push("Step branches.exclude must be an array");
    }
  }

  return errors;
}

/**
 * Validate the configuration object
 * @param config - Configuration to validate
 * @returns Validation result
 */
export function validateConfig(config: SafeTrunkConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate branches configuration
  if (config.branches?.include && !Array.isArray(config.branches.include)) {
    errors.push("branches.include must be an array");
  }
  if (config.branches?.exclude && !Array.isArray(config.branches.exclude)) {
    errors.push("branches.exclude must be an array");
  }

  // Validate steps
  if (config.prePushSteps) {
    if (Array.isArray(config.prePushSteps)) {
      for (const [index, step] of config.prePushSteps.entries()) {
        const stepErrors = validateStep(step);
        for (const error of stepErrors) {
          errors.push(`prePushSteps[${index.toString()}]: ${error}`);
        }
      }
    } else {
      errors.push("prePushSteps must be an array");
    }
  }

  if (config.postPushSteps) {
    if (Array.isArray(config.postPushSteps)) {
      for (const [index, step] of config.postPushSteps.entries()) {
        const stepErrors = validateStep(step);
        for (const error of stepErrors) {
          errors.push(`postPushSteps[${index.toString()}]: ${error}`);
        }
      }
    } else {
      errors.push("postPushSteps must be an array");
    }
  }

  // Validate feedback configuration
  if (
    config.feedback?.enableGamification !== undefined &&
    typeof config.feedback.enableGamification !== "boolean"
  ) {
    errors.push("feedback.enableGamification must be a boolean");
  }
  if (
    config.feedback?.showImpactAreas !== undefined &&
    typeof config.feedback.showImpactAreas !== "boolean"
  ) {
    errors.push("feedback.showImpactAreas must be a boolean");
  }
  if (
    config.feedback?.showSuggestions !== undefined &&
    typeof config.feedback.showSuggestions !== "boolean"
  ) {
    errors.push("feedback.showSuggestions must be a boolean");
  }

  // Validate error reporting configuration
  if (
    config.errorReporting?.showStepOutput !== undefined &&
    typeof config.errorReporting.showStepOutput !== "boolean"
  ) {
    errors.push("errorReporting.showStepOutput must be a boolean");
  }

  // Validate messages configuration
  if (config.messages && typeof config.messages !== "object") {
    errors.push("messages must be an object");
  }

  return {
    errors,
    isValid: errors.length === 0,
    warnings,
  };
}
