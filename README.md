# SafeTrunk

A powerful CLI tool for improving trunk-based development workflows by automating quality checks and ensuring code quality standards.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/safe-trunk)](https://nodejs.org)
[![npm version](https://badge.fury.io/js/safe-trunk.svg)](https://badge.fury.io/js/safe-trunk)

## Features

- 🚀 Automated pre-push checks to maintain code quality
- 🔍 Comprehensive verification system
- 🔄 Smart branch synchronization
- 📊 Insightful code analysis
- 🎮 Gamification system to encourage best practices
- 🔌 Extensible plugin architecture
- 🎨 Customizable output formats
- 📝 Detailed reporting and suggestions

## Installation

```bash
npm install -g safe-trunk
```

## Quick Start

1. Initialize SafeTrunk in your project:

```bash
safetrunk init
```

2. Run pre-push checks:

```bash
safetrunk run
```

3. Verify your changes without pushing:

```bash
safetrunk check
```

## Command Reference

### `safetrunk run`

Executes pre-push checks and performs the push if all checks pass.

```bash
safetrunk run [options]

Options:
  -c, --config <path>  Path to custom configuration
  -v, --verbose        Enable verbose output
  -q, --quiet         Enable quiet mode
  -h, --help          Display help information
```

### `safetrunk check`

Runs verification checks without pushing changes.

```bash
safetrunk check [options]

Options:
  -c, --config <path>  Path to custom configuration
  -v, --verbose        Enable verbose output
  -q, --quiet         Enable quiet mode
  -h, --help          Display help information
```

## Configuration

SafeTrunk can be configured through a `safetrunk.config.js`, `safetrunk.config.ts`, or `safetrunk.config.json` file in your project root.

```typescript
// safetrunk.config.ts
export default {
  branches: {
    include: ["main", "develop", "feature/*"],
    exclude: ["docs/*"],
  },
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
  feedback: {
    enableGamification: true,
    showImpactAreas: true,
    suggestionLevel: "normal",
  },
};
```

For detailed configuration options and error handling, see our [Configuration Guide](https://safetrunk.dev/config/overview).

## Plugin System

SafeTrunk supports plugins to extend its functionality. Create a plugin by implementing the `SafeTrunkPlugin` interface:

```typescript
import type { SafeTrunkPlugin } from "safe-trunk";

export class MyCustomPlugin implements SafeTrunkPlugin {
  name = "my-custom-plugin";

  register(trunk: SafeTrunk): void {
    trunk.on("beforeCheck", async (context) => {
      // Custom logic here
    });
  }
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Documentation

For detailed documentation, visit our [official documentation site](https://safetrunk.dev).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://safetrunk.dev)
- 🐛 [Issue Tracker](https://github.com/fvena/safeTrunk/issues)
- 💬 [Discussions](https://github.com/fvena/safeTrunk/discussions)

## Acknowledgments

Special thanks to all contributors who have helped make SafeTrunk better!
