# Configuration Overview

The configuration management system for SafeTrunk provides a flexible way to configure the tool's behavior through various configuration file formats.

## Configuration File

SafeTrunk looks for configuration in the following files (in order):

1. `safetrunk.config.ts` (TypeScript)
2. `safetrunk.config.js` (JavaScript)
3. `safetrunk.config.json` (JSON)

The configuration files are searched in the order listed above, and the first one found is used.

## Configuration Options

### Basic Structure

```typescript
interface SafeTrunkConfig {
  branches?: {
    include?: string[]; // Glob patterns for branches to include
    exclude?: string[]; // Glob patterns for branches to exclude
  };
  prePushSteps?: Step[]; // Steps to run before pushing
  postPushSteps?: Step[]; // Steps to run after pushing
  pullBeforeChecks?: boolean; // Whether to pull changes before running checks
  feedback?: {
    enableGamification?: boolean; // Enable gamification features
    showImpactAreas?: boolean; // Show impact areas in feedback
    suggestionLevel?: "none" | "minimal" | "normal" | "verbose";
  };
  messages?: Record<string, string>; // Custom messages for different events
  errorReporting?: {
    level?: "minimal" | "normal" | "detailed";
    showStepOutput: boolean; // Show command output on failure
    suggestFixes: boolean; // Show suggested fixes
    stackTraces: boolean; // Include stack traces in errors
  };
}
```

### Step Configuration

Each step in `prePushSteps` and `postPushSteps` has the following structure:

```typescript
interface Step {
  name: string; // Name of the step
  command: string; // Command to execute
  hideOutput?: boolean; // Whether to hide command output
  parallel?: boolean; // Run in parallel with other steps
  failOnError?: boolean; // Fail the process if step fails
  branches?: {
    include?: string[]; // Branch-specific glob patterns to include
    exclude?: string[]; // Branch-specific glob patterns to exclude
  };
}
```

## Usage Examples

### JSON Configuration

```json
{
  "branches": {
    "include": ["main", "release/*"],
    "exclude": ["dev/*"]
  },
  "prePushSteps": [
    {
      "name": "lint",
      "command": "npm run lint",
      "failOnError": true
    },
    {
      "name": "test",
      "command": "npm test",
      "failOnError": true
    }
  ],
  "feedback": {
    "enableGamification": true,
    "suggestionLevel": "normal"
  }
}
```

### TypeScript Configuration

```typescript
import type { SafeTrunkConfig } from "safetrunk";

const config: SafeTrunkConfig = {
  branches: {
    include: ["main", "release/*"],
    exclude: ["dev/*"],
  },
  prePushSteps: [
    {
      name: "lint",
      command: "npm run lint",
      failOnError: true,
    },
    {
      name: "test",
      command: "npm test",
      failOnError: true,
    },
  ],
  feedback: {
    enableGamification: true,
    suggestionLevel: "normal",
  },
};

export default config;
```

## Default Configuration

If no configuration file is found, the following default configuration is used:

```typescript
{
  branches: {
    include: ['*'],
    exclude: [],
  },
  prePushSteps: [],
  postPushSteps: [],
  pullBeforeChecks: true,
  feedback: {
    enableGamification: true,
    showImpactAreas: true,
    suggestionLevel: 'normal',
  },
  messages: {},
  ui: {
    theme: 'default',
    showProgress: true,
    quietMode: false,
  },
  errorReporting: {
    level: 'normal',
    showStepOutput: true,
    suggestFixes: true,
    stackTraces: false,
  },
}
```

## Command Line Options

Command line options take precedence over configuration file and environment variables:

```bash
safetrunk run --config ./custom-config.js --verbose
```

## Configuration Best Practices

1. **Version Control**: Commit your configuration file to share settings with your team
2. **TypeScript**: Use TypeScript configuration files for better type checking and IDE support
3. **Documentation**: Comment your configuration file to explain custom settings
4. **Minimal Configuration**: Start with minimal configuration and add as needed
5. **Team Standards**: Align configuration with your team's workflow and standards

For detailed information about specific configuration sections, see:

- [Branch Configuration](/config/branch-config)
- [Pre-Push Steps](/config/pre-push-steps)
- [Feedback Options](/config/feedback-options)
