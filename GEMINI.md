# Gemini Context: @black-ladder/sing-box-schema

This document provides a comprehensive overview of the `@black-ladder/sing-box-schema` project, its structure, and development conventions to be used as instructional context for Gemini.

## Project Overview

The `@black-ladder/sing-box-schema` project is a TypeScript library intended to provide a schema for `sing-box` configuration files. Based on the dependencies, it is designed to use the `zod` library for schema validation.

The project is set up as a modern TypeScript library using **Bun** as the runtime and package manager.

- **Main Technologies:** TypeScript, Bun, Zod
- **Build Tool:** `tsdown` is used for bundling the code into CommonJS (CJS) and ECMAScript Modules (ESM) formats.
- **Linting & Formatting:** Code quality is maintained using **Biome**.

**Current Status:** The project is currently in a boilerplate state. The core schema logic in `src/index.ts` has not yet been implemented.

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

## Development Conventions

-   **Code Style:** The project uses **Biome** for code formatting and linting. Configuration can be found in `biome.jsonc`.
-   **Build Configuration:** The build process is managed by `tsdown` and configured in `tsdown.config.ts`. It is set up to generate minified CJS and ESM modules, along with TypeScript declaration files (`.d.ts`) and source maps.
-   **Dependencies:** All dependencies are managed using `bun`.
