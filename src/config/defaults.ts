/**
 * Default configuration values for SafeTrunk
 * @packageDocumentation
 */

import type { SafeTrunkConfig } from "./types";

/**
 * Get the default configuration values
 * @returns Default SafeTrunk configuration
 */
export function getDefaultConfig(): SafeTrunkConfig {
  return {
    branches: {
      exclude: [],
      include: ["main"],
    },
    errorReporting: {
      showStepOutput: true,
    },
    feedback: {
      enableGamification: true,
      showImpactAreas: true,
    },
    messages: {
      temp: "temp",
    },
    postPushSteps: [],
    prePushSteps: [],
    pullBeforeChecks: true,
  };
}
