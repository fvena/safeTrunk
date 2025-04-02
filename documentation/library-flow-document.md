# SafeTrunk Command Line Interface & Operation Flow

## Installation and Configuration

SafeTrunk is designed to operate directly from the command line interface. A new user starts by installing the tool via npm (either globally or as a project dependency) and configuring it for their Git repository. The installation process is straightforward:

```bash
# Global installation
npm install -g safetrunk

# Or project-specific installation
npm install --save-dev safetrunk
```

After installation, users can set up the Git hook integration with Husky:

```bash
# Create pre-push hook with Husky
npx husky add .husky/pre-push "npx safetrunk run"
```

The first time SafeTrunk runs, it scans for a configuration file (safetrunk.config.js, safetrunk.config.ts, or safetrunk.config.json) in the project root. If no configuration is found, it guides the developer through creating one with sensible defaults using the `safetrunk init` command.

## Command Line Interface Design

SafeTrunk's primary interface is the command line, where it displays clear, visually appealing output using colors, formatted text, and progress indicators. The main commands include:

```bash
# Run checks without pushing
npx safetrunk check

# Run checks and push if they pass
npx safetrunk run

# Use a specific configuration file
npx safetrunk run --config ./configs/my-config.js
```

### User Interface Design

Even though SafeTrunk is a CLI tool, it features a modern and visually engaging appearance:

- **Component-Based Approach**: The UI is divided into small, reusable pieces such as progress indicators, status messages, notification boxes, and error displays.

- **Color Scheme**: SafeTrunk uses a carefully selected color palette to enhance readability and user experience

- **Visual Elements**: The CLI includes modern design elements such as:
  - Progress bars with percentage completion
  - Spinners for ongoing operations
  - Boxed messages for important notifications
  - Icons for status indicators
  - Clean spacing and alignment for readability

## Pre-Push Workflow

When triggered via a Git pre-push hook (or manually via the `run` command), SafeTrunk executes the following workflow:

1. **Configuration Loading**:

   - Loads and validates the configuration file
   - Sets up the execution environment based on the configuration

1. **Remote Repository Synchronization**:

   - If configured, checks for remote changes
   - Pulls remote changes if `pullBeforeChecks` is enabled
   - Aborts the process if merge conflicts are detected

1. **Pre-Push Checks Execution**:

   - Displays a list of steps to be executed
   - Executes each configured pre-push step in sequence (or in parallel if specified)
   - Shows progress indicators during execution
   - By default, hides detailed output unless a step fails
   - If a step fails, displays the complete output and error details

1. **Push Authorization**:
   - If all checks pass, allows the push to proceed
   - If any critical checks fail, prevents the push with clear error messages

The interface dynamically updates to show the status of each step, with progress indicators and clear success/failure notifications. Error messages are designed to be solution-oriented, providing guidance on how to resolve issues.

## Post-Push Actions

After a successful push, SafeTrunk executes any configured post-push actions:

1. Displays a list of post-push actions to be executed
2. Executes each action with visual progress indicators
3. Shows the results of each action
4. Provides a summary of all completed actions

These actions might include deployments to staging environments, documentation generation, or other automated tasks specific to the project workflow.

## Feedback and Analysis

At the end of the process, SafeTrunk provides comprehensive feedback:

1. **Execution Summary**:

   - Overall success/failure status
   - Time taken for each phase

2. **Change Analysis**:

   - Statistics on modified files, lines added/deleted
   - Complexity analysis of the changes
   - Impact areas potentially affected by the changes

3. **Gamification**:
   - Achievement notifications
   - Level progress updates
   - Historical statistics

The feedback is presented in a clear, visually structured format that helps developers understand the impact of their changes and identify areas for improvement.

## Architecture and Technical Implementation

### Modular Design

SafeTrunk follows a modular architecture with clear separation of concerns:

- **Core Engine**: Handles configuration, workflow orchestration, and context management
- **Git Interface**: Encapsulates all interactions with Git
- **Execution Engine**: Manages the execution of verification steps
- **Analysis Modules**: Analyze code changes and provide metrics
- **Feedback Engine**: Generates and presents feedback
- **UI Module**: Manages console presentation and formatting
- **Persistence Module**: Handles local storage of statistics and gamification data
- **Integration Module**: Provides plugin support and extensibility

### Component Communication

Components communicate through well-defined interfaces:

- Each module exposes a clear API through its index.ts file
- Dependencies flow in a single direction to avoid circular references
- The Context Manager provides a shared execution context

### Data Management

For data persistence, SafeTrunk uses:

- **Configuration Files**: Stored in the project root (safetrunk.config.js/ts/json)
- **Local Storage**: For gamification data and usage statistics
- **File System**: For temporary analysis results

The persistence is entirely local and lightweight, requiring no external servers or databases for core functionality.

### Plugin System

SafeTrunk's plugin system enables extensibility:

- Plugins can hook into various stages of execution
- The event system allows plugins to respond to specific triggers
- Plugins are loaded during initialization and remain active throughout the process

Example plugin structure:

```javascript
// Example plugin
module.exports = {
  name: "custom-analyzer",
  version: "1.0.0",
  register: function (safetrunk) {
    // Register for events
    safetrunk.on("beforeAnalysis", function (context) {
      // Add custom analysis logic
    });
  },
};
```

## Security Considerations

SafeTrunk takes several security measures:

- **Command Validation**: All user-provided commands are validated before execution
- **Plugin Sandboxing**: Plugins run in a restricted environment to prevent security issues
- **No Remote Dependencies**: All core functionality works offline and locally
- **Configuration Validation**: Configuration files are validated to prevent injection attacks

## Performance Optimization

SafeTrunk is designed to be efficient and responsive:

- **Parallel Execution**: Steps can be configured to run in parallel when appropriate
- **Caching**: Results of previous analyses can be cached to improve performance
- **Minimal Dependencies**: The tool has a lightweight footprint
- **Resource Management**: Careful control of memory usage during analysis

## Conclusion

SafeTrunk provides a streamlined workflow for trunk-based development by automating quality checks and providing meaningful feedback. From installation and configuration to execution and analysis, the tool is designed to enhance productivity while maintaining code quality. The combination of clear visual feedback, flexible configuration, and extensible architecture makes SafeTrunk an invaluable tool for individual developers and small teams working directly on the main branch.

The tool's modular design ensures it can evolve with changing requirements, while its focus on local operation keeps it fast and reliable. With its intuitive interface and comprehensive feedback system, SafeTrunk helps developers maintain high-quality codebases with minimal overhead.
