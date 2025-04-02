# Configuration Overview

SafeTrunk can be configured through a configuration file, command-line options, and environment variables. This guide explains all available configuration options and how to use them effectively.

## Configuration File

SafeTrunk looks for configuration in the following files (in order):

1. `safetrunk.config.ts` (TypeScript)
2. `safetrunk.config.js` (JavaScript)
3. `safetrunk.config.json` (JSON)

## Configuration Structure

Here's a complete configuration file with all available options:

```typescript
import type { SafeTrunkConfig } from "safe-trunk";

export default {
  // Branch configuration
  branches: {
    include: ["main", "develop", "feature/*"],
    exclude: ["docs/*", "chore/*"],
  },

  // Pre-push steps configuration
  prePushSteps: [
    {
      name: "lint",
      command: "npm run lint",
      hideOutput: false,
      parallel: false,
      failOnError: true,
    },
    {
      name: "test",
      command: "npm run test",
      hideOutput: true,
      parallel: false,
      failOnError: true,
    },
  ],

  // Post-push steps configuration
  postPushSteps: [
    {
      name: "deploy",
      command: "npm run deploy",
      hideOutput: false,
      parallel: false,
      failOnError: false,
    },
  ],

  // Pull configuration
  pullBeforeChecks: true,

  // Feedback configuration
  feedback: {
    enableGamification: true,
    showImpactAreas: true,
    suggestionLevel: "normal", // 'none' | 'minimal' | 'normal' | 'verbose'
  },

  // Custom messages
  messages: {
    prePushStart: "Starting pre-push checks...",
    prePushSuccess: "All checks passed! 🎉",
    prePushFailure: "Some checks failed. Please fix the issues and try again.",
  },

  // UI configuration
  ui: {
    theme: "default", // 'default' | 'minimal' | 'colorful'
    showProgress: true,
    quietMode: false,
  },

  // Error reporting configuration
  errorReporting: {
    level: "normal", // 'minimal' | 'normal' | 'detailed'
    showStepOutput: true,
    suggestFixes: true,
    stackTraces: false,
  },
} satisfies SafeTrunkConfig;
```

## Configuration Options

### Branch Configuration

Control which branches are included in or excluded from checks:

```typescript
branches: {
  include: string[]; // Glob patterns for branches to include
  exclude: string[]; // Glob patterns for branches to exclude
}
```

### Pre-Push Steps

Define steps to run before pushing changes:

```typescript
prePushSteps: {
  name: string;      // Step name for display
  command: string;   // Command to execute
  hideOutput?: boolean; // Hide command output unless it fails
  parallel?: boolean;   // Run in parallel with other steps
  failOnError?: boolean; // Stop execution if step fails
}[]
```

### Post-Push Steps

Define steps to run after successful push:

```typescript
postPushSteps: {
  // Same structure as prePushSteps
}
[];
```

### Pull Configuration

```typescript
pullBeforeChecks: boolean; // Pull latest changes before running checks
```

### Feedback Configuration

Configure feedback and gamification features:

```typescript
feedback: {
  enableGamification: boolean; // Enable achievement system
  showImpactAreas: boolean; // Show affected areas of code
  suggestionLevel: "none" | "minimal" | "normal" | "verbose";
}
```

### UI Configuration

Customize the user interface:

```typescript
ui: {
  theme: "default" | "minimal" | "colorful";
  showProgress: boolean; // Show progress indicators
  quietMode: boolean; // Minimize output
}
```

### Error Reporting

Configure error reporting behavior:

```typescript
errorReporting: {
  level: "minimal" | "normal" | "detailed";
  showStepOutput: boolean; // Show command output on failure
  suggestFixes: boolean; // Show suggested fixes
  stackTraces: boolean; // Include stack traces in errors
}
```

## Environment Variables

All configuration options can be overridden using environment variables:

| Variable            | Description           | Example                 |
| ------------------- | --------------------- | ----------------------- |
| `SAFETRUNK_CONFIG`  | Path to config file   | `./config/safetrunk.js` |
| `SAFETRUNK_QUIET`   | Enable quiet mode     | `true`                  |
| `SAFETRUNK_VERBOSE` | Enable verbose output | `true`                  |

## Command Line Options

Command line options take precedence over configuration file and environment variables:

```bash
safetrunk run --config ./custom-config.js --verbose
```

## Configuration Best Practices

1. **Version Control**: Commit your configuration file to share settings with your team
2. **Environment-Specific**: Use environment variables for environment-specific settings
3. **Documentation**: Comment your configuration file to explain custom settings
4. **Minimal Configuration**: Start with minimal configuration and add as needed
5. **Team Standards**: Align configuration with your team's workflow and standards

For detailed information about specific configuration sections, see:

- [Branch Configuration](/config/branch-config)
- [Pre-Push Steps](/config/pre-push-steps)
- [Feedback Options](/config/feedback-options)
