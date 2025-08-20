# Gemini Context

This document provides a comprehensive overview of the `Sing-box Schema` project, its structure, and development conventions to be used as instructional context for Gemini.

## Project Overview

The `Sing-box Schema` project is a TypeScript library that provides a comprehensive Zod schema for `sing-box` configuration files. It aims to cover all aspects of the `sing-box` configuration, including inbounds, outbounds, routing, DNS, and experimental features.

The project is set up as a modern TypeScript library using **Bun** as the runtime and package manager.

- **Main Technologies:** TypeScript, Bun, Zod
- **Build Tool:** `tsdown` is used for bundling the code into CommonJS (CJS) and ECMAScript Modules (ESM) formats.
- **Linting & Formatting:** Code quality is maintained using **Biome**.
- **Schema Generation:** A script is provided to generate a JSON schema from the Zod schemas.

## Project Structure

The project is organized into the following main directories:

-   `src/schema`: Contains all the Zod schema definitions.
    -   `src/schema/protocols`: Contains schemas for specific protocols like `shadowsocks`, `trojan`, `vmess`, etc.
    -   `src/schema/services`: Contains schemas for services like `derp`, `resolved`, etc.
    -   `src/schema/experimentals`: Contains schemas for experimental features.
    -   `src/schema/rules`: Contains schemas for routing and DNS rules.
-   `src/utils.ts`: Contains utility functions used by the schemas.
-   `src/index.ts`: The main entry point of the library, exporting all the schemas.
-   `scripts`: Contains scripts for the project, like generating the JSON schema.

## Building and Running

The following scripts are available in `package.json` and should be run with `bun`.

-   **Install Dependencies:**
    ```bash
    bun install
    ```

-   **Build:**
    Builds the project for production.
    ```bash
    bun run build
    ```

-   **Development:**
    Runs the build in watch mode for development.
    ```bash
    bun run dev
    ```

-   **Type Checking:**
    Runs the TypeScript compiler to check for type errors.
    ```bash
    bun run typecheck
    ```

-   **Linting:**
    Checks for and automatically fixes linting and formatting issues using Biome.
    ```bash
    bun run lint
    ```

-   **Generate JSON Schema:**
    Generates a `schema.json` file from the Zod schemas.
    ```bash
    bun run generate
    ```

## Development Conventions

-   **Code Style:** The project uses **Biome** for code formatting and linting. Configuration can be found in `biome.jsonc`.
-   **Build Configuration:** The build process is managed by `tsdown` and configured in `tsdown.config.ts`. It is set up to generate minified CJS and ESM modules, along with TypeScript declaration files (`.d.ts`) and source maps.
-   **Dependencies:** All dependencies are managed using `bun`.
-   **Schema Organization:** Schemas are organized by their corresponding `sing-box` configuration section. Shared schemas are located in `src/schema/shared.ts`.