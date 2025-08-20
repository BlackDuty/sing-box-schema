# @black-ladder/sing-box-schema

A comprehensive Zod schema for `sing-box` configuration files.

This library provides a complete set of Zod schemas for validating `sing-box` configuration files. It is designed to be used in any TypeScript or JavaScript project where you need to work with `sing-box` configurations.

## Features

-   **Comprehensive:** Covers all aspects of the `sing-box` configuration, including inbounds, outbounds, routing, DNS, and experimental features.
-   **Type-Safe:** Provides strong type safety for your `sing-box` configurations.
-   **Validation:** Includes detailed validation for all configuration options.
-   **Well-Organized:** Schemas are organized by their corresponding `sing-box` configuration section.
-   **Up-to-Date:** Maintained to keep up with the latest `sing-box` releases.

## Installation

To install the library, use your favorite package manager:

```bash
bun add @black-ladder/sing-box-schema
# or
npm install @black-ladder/sing-box-schema
# or
yarn add @black-ladder/sing-box-schema
```

## Usage

You can use the `Configuration` schema to validate your `sing-box` configuration files.

```typescript
import { Configuration } from '@black-ladder/sing-box-schema';

const myConfig = {
  // Your sing-box configuration
};

try {
  const validatedConfig = Configuration.parse(myConfig);
  console.log('Configuration is valid!');
} catch (error) {
  console.error('Configuration is invalid:', error);
}
```

## Development

This project is managed with [Bun](https://bun.sh).

### Setup

To install dependencies:

```bash
bun install
```

### Scripts

-   **Build:** `bun run build`
-   **Development:** `bun run dev`
-   **Type Checking:** `bun run typecheck`
-   **Linting:** `bun run lint`
-   **Generate JSON Schema:** `bun run generate`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.