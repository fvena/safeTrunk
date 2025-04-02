# Tech Stack Document for SafeTrunk

This document explains the technology choices behind SafeTrunk – a command-line tool designed to improve trunk development workflow by automating quality checks before and after pushes to the main branch. We've designed it to be easy to use, configurable, and extensible while maintaining high performance and compatibility across different environments.

## Core Technologies

SafeTrunk is built using the following core technologies:

- **Node.js Runtime Environment**: SafeTrunk requires Node.js 14.x or higher to run. This environment provides the necessary foundation for executing the tool across different operating systems (Windows, macOS, and Linux).

- **TypeScript for Type Safety and Maintainability**: All code is written in TypeScript to ensure type safety, better error detection during development, and improved code maintainability over time.

## CLI and User Interface

For the command-line interface, we've selected libraries that help create a visually appealing and informative experience:

- **Commander**: Used for parsing command-line arguments and defining the CLI commands structure.
- **Chalk**: Provides colorful output in the terminal, enhancing readability and user experience.
- **Ora**: Implements elegant spinner animations to display progress during longer operations.
- **Inquirer**: Enables interactive prompts when user input is required.
- **Boxen**: Creates visually appealing boxes in the terminal for important messages.
- **Terminal-link**:Adds clickable links in terminal output where supported.

## Git Integration

For interacting with Git repositories, we use:

- **Simple-git**: A lightweight interface for running git commands from Node.js applications.
- **Git Hooks Integration**: SafeTrunk is designed to work primarily with Git pre-push hooks, allowing automatic execution before pushing to the main branch.

## Process Execution

For running external commands and processes:

- **Execa**: Provides a better interface for spawning child processes with improved error handling.
- **Cross-spawn**: Ensures cross-platform compatibility when executing processes.

## File System and Utilities

For file operations and general utilities:

- **Fs-extra**: Extends the Node.js file system module with additional functionality.
- **Glob**:Used for file pattern matching.
- **Strip-ansi**: Helps manage output without formatting when needed.
- **Deep-merge**: Used for combining configuration objects.

## Architecture Components

SafeTrunk follows a modular architecture with the following key components:

- **Core Engine**

  - ConfigManager: Handles loading and validating user configuration.
  - WorkflowController: Orchestrates the entire execution process.
  - ContextManager: Maintains execution context between modules.

- **Git Module**

  - GitInterface: Encapsulates all Git interactions.
  - DiffManager: Analyzes and processes code differences.

- **Execution Module**

  - StepExecutor: Runs individual verification steps.
  - ParallelExecutor: Manages concurrent execution when possible.
  - ExecutionStrategy: Defines different execution strategies.

- **Analysis Module**

  - ChangeAnalyzer: Generates metrics and statistics for code changes.
  - ImpactAnalyzer: Identifies areas potentially affected by changes.
  - ComplexityCalculator: Evaluates the complexity of changes.

- **Feedback Module**

  - FeedbackEngine: Coordinates feedback generation.
  - SuggestionGenerator: Provides context-aware suggestions.
  - ReportFormatter: Formats analysis results for presentation.

- **UI Module**

  - ConsoleUI: Manages formatted console presentation.
  - ProgressReporter: Displays execution progress.
  - ThemeManager: Handles color schemes and visual presentation.

- **Persistence Module**

  - StatisticsStore: Stores usage data and statistics.
  - GamificationEngine: Implements achievements and levels.
  - LocalStorage: Manages local persistent storage.

- **Integration Module**
  - PluginManager: Coordinates loading and execution of plugins.
  - EventSystem: Implements an event system for plugin communication.
  - APIProvider: Exposes public APIs for plugin extension.
  - GitHooksManager: Manages Git hooks integration.

## Testing Tools

For ensuring code quality and reliability:

- **Vitest**: Used for unit testing components.
- **Mock-fs**: Allows simulation of file systems for testing.
- **Stdout-stderr**: Used for capturing output during tests.

## Design Patterns Implemented

SafeTrunk implements several design patterns to ensure maintainability and extensibility:

- **Strategy Pattern**: For implementing different execution strategies.
- **Observer Pattern**: For event notifications during the process.
- **Factory Method**: For creating instances of verification steps.
- **Dependency Injection**: For testing and extensibility.
- **Command Pattern**: For executing individual steps.
- **Chain of Responsibility**: For sequential processing of verifications.

## Security and Performance Considerations

To ensure security and optimal performance:

- **Command Validation**: All user-defined commands are validated to prevent injection attacks.
- **Execution Timeout**: Steps can have configurable timeouts to prevent hanging.
- **Parallel Execution**: Independent steps can be executed in parallel to improve performance.
- **Resource Management**: Memory usage is monitored and controlled, especially for long-running processes.

## Distribution and Installation

SafeTrunk is distributed as an npm package, allowing easy installation:

```bash
# Global installation
npm install -g safetrunk

# Project-specific installation
npm install --save-dev safetrunk
```

Integration with Git hooks is facilitated through Husky:

```bash
npx husky add .husky/pre-push "npx safetrunk run"
```

## System Requirements

- **Node.js**: Version 14.x or higher
- **Git**: Version 2.x or higher
- **Operating System**: Compatible with Windows, macOS, and Linux

## Conclusion

SafeTrunk's technology stack has been carefully selected to create a robust, maintainable, and user-friendly tool that fits seamlessly into modern development workflows. By focusing on modular architecture, clear separation of concerns, and thoughtful library selection, we've created a solution that helps developers maintain high code quality without adding significant overhead to their workflow.

The combination of TypeScript for type safety, a modular plugin system for extensibility, and carefully chosen UI libraries for a pleasant command-line experience makes SafeTrunk a valuable tool for trunk-based development practices.
