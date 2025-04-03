# Technical Specifications Document - SafeTrunk

## 1. Main API

This section documents in detail the main API of SafeTrunk, including the types, interfaces, and classes that form the foundation of the system.

### 1.1 Base Types

```typescript
export interface SafeTrunkConfig {
  branches?: {
    include?: string[];
    exclude?: string[];
  };
  prePushSteps?: Step[];
  postPushSteps?: Step[];
  pullBeforeChecks?: boolean;
  feedback?: {
    enableGamification?: boolean;
    showImpactAreas?: boolean;
    suggestionLevel?: "none" | "minimal" | "normal" | "verbose";
  };
  messages?: Record<string, string>;
  errorReporting?: {
    level?: "minimal" | "normal" | "detailed";
    showStepOutput?: boolean;
    suggestFixes?: boolean;
    stackTraces?: boolean;
  };
}

export interface Step {
  name: string;
  command: string;
  hideOutput?: boolean;
  parallel?: boolean;
  failOnError?: boolean;
  branches?: {
    include?: string[];
    exclude?: string[];
  };
}

export interface RunResult {
  success: boolean;
  steps: StepResult[];
  currentBranch: string;
  changedFiles: string[];
  stats: {
    filesChanged: number;
    insertions: number;
    deletions: number;
  };
  analysis: {
    complexity: number;
    impactAreas: string[];
    suggestions: string[];
  };
}

export interface StepResult {
  name: string;
  command: string;
  success: boolean;
  exitCode: number;
  output: string;
  duration: number;
}
```

### 1.2 Main Class

The `SafeTrunk` class is the primary entry point to the library and provides the necessary methods to interact with all its functionalities.

```typescript
export class SafeTrunk {
  constructor(config?: SafeTrunkConfig) { ... }

  async run(options?: { force?: boolean; message?: string }): Promise<RunResult> { ... }
  async check(options?: { fix?: boolean }): Promise<RunResult> { ... }
  addPrePushStep(step: Step): SafeTrunk { ... }
  addPostPushStep(step: Step): SafeTrunk { ... }
  use(plugin: SafeTrunkPlugin): SafeTrunk { ... }
  on(event: string, handler: Function): SafeTrunk { ... }
  install(): SafeTrunk { ... }
  getConfig(): SafeTrunkConfig { ... }
  static readonly version: string = '1.0.0';
}
```

## 2. Plugin System

SafeTrunk implements a robust plugin system to allow extension of its functionality without modifying the core code.

### 2.1 Plugin Interface

```typescript
export interface SafeTrunkPlugin {
  name: string;
  register(trunk: SafeTrunk): void;
}
```

### 2.2 Hook System

Plugins can hook into specific lifecycle points using the hook system:

```typescript
export interface SafeTrunkHooks {
  beforeCheck?: (context: any) => Promise<void> | void;
  beforeRun?: (context: any) => Promise<void> | void;
  beforeStep?: (step: Step) => Promise<Step> | Step;
  afterStep?: (result: StepResult) => Promise<void> | void;
  beforePush?: (context: any) => Promise<void> | void;
  afterPush?: (context: any) => Promise<void> | void;
  beforeAnalysis?: (context: any) => Promise<void> | void;
  afterAnalysis?: (analysis: any) => Promise<any> | any;
}
```

### 2.3 Event System

Plugins can subscribe to specific events using the `on()` method:

```typescript
// Available events
export enum SafeTrunkEvents {
  // Main lifecycle
  BEFORE_RUN = "beforeRun",
  AFTER_RUN = "afterRun",
  BEFORE_CHECK = "beforeCheck",
  AFTER_CHECK = "afterCheck",

  // Git interaction
  BEFORE_PULL = "beforePull",
  AFTER_PULL = "afterPull",
  BEFORE_PUSH = "beforePush",
  AFTER_PUSH = "afterPush",

  // Step execution
  BEFORE_STEP = "beforeStep",
  AFTER_STEP = "afterStep",
  STEP_FAILED = "stepFailed",

  // Analysis
  BEFORE_ANALYSIS = "beforeAnalysis",
  AFTER_ANALYSIS = "afterAnalysis",

  // Gamification
  ACHIEVEMENT_UNLOCKED = "achievementUnlocked",
  LEVEL_UP = "levelUp",
}
```

## 3. Error Handling System

SafeTrunk implements a hierarchical error system to provide clear and useful information about issues during execution.

```typescript
// Base class for all SafeTrunk errors
export class SafeTrunkError extends Error { ... }

// Errors
export class ConfigurationError extends SafeTrunkError { ... }
export class GitError extends SafeTrunkError { ... }
export class StepExecutionError extends SafeTrunkError { ... }
export class StepFailedError extends Error { ... }
export class PluginError extends SafeTrunkError { ... }
export class WorkflowError extends SafeTrunkError { ... }
export class ValidationError extends SafeTrunkError { ... }
export class FileSystemError extends SafeTrunkError { ... }
```

### Error Handling Principles

1. **Clear differentiation** between library errors and failures in external scripts
1. **Enriched context** in every error to facilitate debugging
1. **Suggested solutions** for common issues
1. **Configurable** levels of detail in error messages
1. **Complete documentation** of all possible errors and solutions

## 4. CLI Command Reference

SafeTrunk provides a complete command-line interface with several commands for different operations.

### 4.1 Main Commands

#### 4.1.1 `run` Command

Executes pre-push checks and performs the push if all pass.

```bash
safetrunk run [options]
```

Options:

- `--config, -c <path>`: Path to a custom configuration file
- `--message, -m <message>`: Custom commit message (only for amend)
- `--quiet, -q`: Quiet mode with minimal output
- `--verbose, -v`: Verbose mode with full output
- `--help, -h`: Show help for the command

#### 4.1.2 `check` Command

Executes pre-push checks only, without pushing.

```bash
safetrunk check [options]
```

Options:

- `--config, -c <path>`: Path to a custom configuration file
- `--quiet, -q`: Quiet mode with minimal output
- `--verbose, -v`: Verbose mode with full output
- `--help, -h`: Show help for the command

#### 4.1.3 `init` Command

Creates an initial configuration for the project.

```bash
safetrunk init [options]
```

Options:

- `--yes, -y`: Non-interactive mode using default values
- `--help, -h`: Show help for the command

#### 4.1.4 `install` Command

Installs the necessary Git hooks for integration.

```bash
safetrunk install [options]
```

Options:

- `--force, -f`: Overwrite existing hooks
- `--husky`: Use Husky to install the hooks
- `--help, -h`: Show help for the command

#### 4.1.5 `stats` Command

Displays usage statistics and achievements (requires gamification enabled).

```bash
safetrunk stats [options]
```

Options:

- `--format <format>`: Output format (text, json)
- `--reset`: Reset all statistics
- `--help, -h`: Show help for the command

### 4.2 Usage Examples

```bash
# Run checks and push
npx safetrunk run

# Run only checks
npx safetrunk check

# Use a specific config file
npx safetrunk run --config ./configs/my-config.js

# Force execution ignoring non-critical errors
npx safetrunk run --force

# Quiet mode
npx safetrunk run --quiet

# Initialize config for frontend project
npx safetrunk init --template frontend

# Install hooks using Husky
npx safetrunk install --husky

# View stats in JSON format
npx safetrunk stats --format json

# Show available commands
npx safetrunk --help

# Show help for a specific command
npx safetrunk run --help
```

## 5. Testing Strategy

### 5.1 Testing Levels

SafeTrunk employs a comprehensive testing strategy covering multiple levels to ensure software quality and robustness:

#### 5.1.1 Unit Tests

Unit tests verify the behavior of individual components in isolation:

- **Target coverage**: >90% for core modules
- **Main tool**: Vitest
- **Focus**: Test each function, class, and method in isolation with mocks for external dependencies
- **Location**: `/test/unit/[module-name]/*.test.ts`

#### 5.1.2 Integration Tests

Integration tests verify the correct interaction between multiple components:

- **Target coverage**: >80% of critical flows
- **Focus**: Test integration between modules with minimal mocking
- **Location**: `/test/integration/[flow-name]/*.test.ts`

#### 5.1.3 System Tests (E2E)

System tests verify the application's behavior in a real-world environment:

- **Target coverage**: Main user flows and edge cases
- **Focus**: Test the application as used by a real user
- **Location**: `/test/e2e/*.test.ts`

### 5.2 Mocking Strategy

#### 5.2.1 Libraries and Tools

- **Mocking Framework**: Vitest with `vi.mock()` and `vi.fn()`
- **Additional Libraries**:
  - **`mock-fs`** for file system simulation
  - **`stdout-stderr`** for capturing console output

#### 5.2.2 Mocking Principles

- **Minimal Mocking**: Use mocks only when necessary, prefer real integration when practical
- **Fidelity**: Mocks should faithfully simulate the behavior of the real component
- **Transparency**: It should be clear which components are being mocked in each test
- **Consistency**: Use common mocking helpers across all tests

## 6. Quality Criteria

### 6.1 Style Guide

SafeTrunk follows strict coding standards to maintain high quality and consistency:

- **Code Style**: Based on the TypeScript style guide with ESLint configuration
- **Formatting**: Prettier with consistent rules
- **Naming Conventions**:
  - `camelCase` for variables, properties, and functions
  - `PascalCase` for classes, interfaces, and types
  - `UPPER_CASE` for constants
  - `_privateProperty` for private properties (prefixed with underscore)

### 6.2 Code Documentation

- **TSDoc** for all public exports
- Explanatory comments for complex code
- Usage examples for main features

## 7. Conclusion

This document provides detailed technical specifications for SafeTrunk, including the main API, plugin system, error handling, analysis module, configuration system, UI components, and CLI command reference.

The modular architecture and well-defined interfaces enable a flexible and extensible implementation that meets the project’s requirements. Each component has clearly defined responsibilities and follows solid software design principles.
