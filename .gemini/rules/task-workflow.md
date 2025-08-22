# Gemini Task Workflow and Guidelines

This document outlines the standard operating procedures for Gemini when performing schema modifications and other development tasks within this project.

## 1. Core Principle: Document-First Approach

All modifications must be driven by and validated against the official project documentation. Assumptions are to be avoided.

## 2. Task Workflow

For any given file modification task, especially for adding or updating schema metadata, the following process must be strictly followed:

### Step 1: Isolate the Target

Identify the specific file to be modified (e.g., `src/schema/protocols/http.ts`).

### Step 2: Discover Relevant Documentation

- **Identify Keywords**: Extract key terms from the file name or its content (e.g., for `http.ts`, the keyword is "http").
- **Targeted Search**: Use the `glob` tool to search for documentation files (`.md`) containing the keyword within the official documentation directories:
  - `/home/evans/Projects/sing-box/docs/configuration/inbound/`
  - `/home/evans/Projects/sing-box/docs/configuration/outbound/`
  - `/home/evans/Projects/sing-box/docs/configuration/endpoint/`
  - `/home/evans/Projects/sing-box/docs/configuration/shared/`
  - etc.
- **Read Documents**: Use the `read_many_files` tool to ingest the content of all found English and Chinese (`.zh.md`) documentation files.

### Step 3: Analyze and Synthesize

- **Cross-Reference**: Carefully compare the schema definitions in the TypeScript file with the descriptions provided in the documentation.
- **Extract Descriptions**: Pull the most accurate and complete descriptions for each schema object and its fields from both English and Chinese sources.
- **Handle Missing Translations**: If a description exists in only one language, translate it to the other language to ensure both `description` and `description_zh` metadata properties are populated.

### Step 4: Modify the Code

- **Preserve Comments**: **Never** delete existing JSDoc comments (`/** ... */`) above fields or objects. They must be preserved.
- **Add Comments if Missing**: If a field lacks a JSDoc comment, add a concise one in English based on the documentation.
- **Use `.meta()`**: Convert all `.describe()` calls to the newer `.meta()` syntax. Add `description` and `description_zh` properties within the `.meta()` object for each field.
- **Add Object Metadata**: For each main schema object, add a `.meta()` call containing `id`, `title`, `title_zh`, and a general `description` and `description_zh`.
- **Choose Modification Tool**: 
  - For smaller, less complex files, the `replace` tool may be used.
  - For larger, more complex files (like `shared.ts`) or after a `replace` failure, the `write_file` strategy must be used. This involves reading the file, constructing the entire new content in memory, and overwriting the file to avoid fragile `old_string` matching issues.

### Step 5: Report and Proceed

- After each successful file modification, report the action to the user (e.g., "`http.ts` has been updated.").
- Proceed to the next file in the task queue.

## 3. General Rules & Checks

- **No Assumptions**: Do not infer functionality that is not explicitly stated in the documentation.
- **Preserve Code Style**: Maintain the existing code formatting, indentation, and style.
- **Confirm Ambiguity**: If the documentation is unclear or contradictory, present the ambiguity to the user for clarification before proceeding.
- **Incremental Progress**: For large tasks involving many files, process one file at a time to ensure accuracy and maintain context.
