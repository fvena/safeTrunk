# Getting Started with SafeTrunk

This guide will help you get started with SafeTrunk in your project. We'll cover installation, basic setup, and your first pre-push check.

## Prerequisites

Before installing SafeTrunk, make sure you have:

- Node.js >= 22.11.0
- npm or yarn package manager
- Git installed and configured

## Installation

You can install SafeTrunk globally using npm:

```bash
npm install -g safe-trunk
```

Or using yarn:

```bash
yarn global add safe-trunk
```

Verify the installation by running:

```bash
safetrunk --version
```

## Project Setup

1. Navigate to your project directory:

```bash
cd your-project
```

2. Initialize SafeTrunk in your project:

```bash
safetrunk init
```

This will create a `safetrunk.config.ts` file in your project root with default settings.

## Basic Configuration

The default configuration file (`safetrunk.config.ts`) looks like this:

```typescript
export default {
  // Branches to include/exclude from checks
  branches: {
    include: ["main", "develop", "feature/*"],
    exclude: ["docs/*"],
  },

  // Steps to run before pushing
  prePushSteps: [
    {
      name: "lint",
      command: "npm run lint",
    },
    {
      name: "test",
      command: "npm run test",
    },
  ],

  // Feedback configuration
  feedback: {
    enableGamification: true,
    showImpactAreas: true,
    suggestionLevel: "normal",
  },
};
```

## Your First Pre-Push Check

1. Make some changes to your code and stage them:

```bash
git add .
```

2. Run SafeTrunk's pre-push checks:

```bash
safetrunk run
```

SafeTrunk will:

1. Execute configured pre-push steps
2. Analyze your changes
3. Provide feedback and suggestions
4. Push your changes if all checks pass

## Understanding the Output

When you run SafeTrunk, you'll see output like this:

```bash
🚀 SafeTrunk - Pre-push Checks

📋 Running checks for branch: feature/new-feature
 ✓ Linting completed successfully
 ✓ Tests passed
 ✓ Code analysis completed

📊 Impact Analysis:
 - Modified 3 files
 - Added 150 lines
 - Removed 50 lines
 - Impact areas: Authentication, User Management

🎮 Achievement Unlocked: First Successful Push! 🏆

✨ All checks passed! Pushing changes...
```

## Next Steps

- Learn about [Configuration Options](/config/overview)
- Explore Advanced Features
- Set up Custom Plugins
- Join our Community

## Troubleshooting

If you encounter any issues:

1. Check the Common Issues guide
2. Ensure your Node.js version meets the requirements
3. Verify your Git configuration
4. Check our [GitHub Issues](https://github.com/fvena/safeTrunk/issues)

For more help, join our [Discussions](https://github.com/fvena/safeTrunk/discussions) on GitHub.
