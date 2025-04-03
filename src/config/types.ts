/**
 * Configuration types for SafeTrunk
 */

/**
 * Step configuration for pre-push and post-push hooks
 */
export interface Step {
  /** Branch-specific configuration for this step */
  branches?: {
    /** Glob patterns for branches to exclude */
    exclude?: string[];
    /** Glob patterns for branches to include */
    include?: string[];
  };
  /** Command to execute */
  command: string;
  /** Whether to fail the entire process if this step fails */
  failOnError?: boolean;
  /** Whether to hide the command output */
  hideOutput?: boolean;
  /** Name of the step for identification and logging */
  name: string;
  /** Whether to run this step in parallel with others */
  parallel?: boolean;
}

/**
 * Custom messages for different events
 */
export interface Messages {
  temp: "temp";
}

/**
 * Main configuration interface for SafeTrunk
 */
export interface SafeTrunkConfig {
  /** Branch-specific configuration */
  branches?: {
    /** Glob patterns for branches to exclude */
    exclude?: string[];
    /** Glob patterns for branches to include */
    include?: string[];
  };
  /** Error reporting configuration */
  errorReporting?: {
    /** Show step output on error */
    showStepOutput?: boolean;
  };
  /** Feedback configuration */
  feedback?: {
    /** Enable gamification features */
    enableGamification?: boolean;
    /** Show impact areas in feedback */
    showImpactAreas?: boolean;
    /** Show suggestions for improvements */
    showSuggestions?: boolean;
  };
  /** Custom messages for different events */
  messages?: Messages;
  /** Steps to run after pushing */
  postPushSteps?: Step[];
  /** Steps to run before pushing */
  prePushSteps?: Step[];
  /** Whether to pull changes before running checks */
  pullBeforeChecks?: boolean;
}

/**
 * Configuration validation result
 */
export interface ValidationResult {
  /** Array of error messages if validation failed */
  errors: string[];
  /** Whether the configuration is valid */
  isValid: boolean;
  /** Warning messages for potential issues */
  warnings: string[];
}
