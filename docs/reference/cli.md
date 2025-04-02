# CLI Reference

SafeTrunk provides a command-line interface (CLI) for interacting with its features. This page documents all available commands and their options.

## Global Options

These options are available for all SafeTrunk commands:

| Option          | Description                              |
| --------------- | ---------------------------------------- |
| `-h, --help`    | Display help information for any command |
| `-v, --version` | Display the current version of SafeTrunk |

## Commands

### `run`

Execute pre-push checks and push if successful.

```bash
safetrunk run [options]
```

#### Options

| Option                | Description                        | Default                         |
| --------------------- | ---------------------------------- | ------------------------------- |
| `-c, --config <path>` | Path to custom configuration file  | `safetrunk.config.{js,ts,json}` |
| `-v, --verbose`       | Enable verbose output              | `false`                         |
| `-q, --quiet`         | Enable quiet mode (minimal output) | `false`                         |

#### Examples

```bash
# Run with default configuration
safetrunk run

# Run with custom configuration file
safetrunk run --config ./custom-config.js

# Run with verbose output
safetrunk run --verbose

# Run with minimal output
safetrunk run --quiet
```

### `check`

Run verification checks without pushing changes.

```bash
safetrunk check [options]
```

#### Options

| Option                | Description                        | Default                         |
| --------------------- | ---------------------------------- | ------------------------------- |
| `-c, --config <path>` | Path to custom configuration file  | `safetrunk.config.{js,ts,json}` |
| `-v, --verbose`       | Enable verbose output              | `false`                         |
| `-q, --quiet`         | Enable quiet mode (minimal output) | `false`                         |

#### Examples

```bash
# Run checks with default configuration
safetrunk check

# Run checks with custom configuration file
safetrunk check --config ./custom-config.js

# Run checks with verbose output
safetrunk check --verbose

# Run checks with minimal output
safetrunk check --quiet
```

## Exit Codes

SafeTrunk uses the following exit codes to indicate the status of command execution:

| Code | Description                              |
| ---- | ---------------------------------------- |
| `0`  | Success - All checks passed              |
| `1`  | Error - Command failed due to an error   |
| `2`  | Invalid - Invalid command or options     |
| `3`  | Check Failed - One or more checks failed |

## Environment Variables

SafeTrunk respects the following environment variables:

| Variable            | Description                | Default                         |
| ------------------- | -------------------------- | ------------------------------- |
| `SAFETRUNK_CONFIG`  | Path to configuration file | `safetrunk.config.{js,ts,json}` |
| `SAFETRUNK_VERBOSE` | Enable verbose output      | `false`                         |
| `SAFETRUNK_QUIET`   | Enable quiet mode          | `false`                         |

## Configuration File

SafeTrunk looks for configuration in the following order:

1. Command line options
2. Environment variables
3. Configuration file (`safetrunk.config.{js,ts,json}`)
4. Default values

For detailed information about configuration options, see the [Configuration Guide](/config/overview).
