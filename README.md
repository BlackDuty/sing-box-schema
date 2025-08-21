<div align="center">

# Sing-box Schema <br> ✍️ 📦

> Provides type-safe [**sing-box**](https://sing-box.sagernet.org/) configuration syntax support for code editors / TypeScript projects

[![Version - v1.12.2](https://img.shields.io/badge/Version-v1.12.2-yellow?style=for-the-badge&logo=task&logoColor=white)](https://github.com/SagerNet/sing-box/tree/v1.12.2) [![JSON Schema - Draft 2020-12](/badges/JSON_Schema-Draft_2020--12-white.svg)](https://json-schema.org/draft/2020-12) [![Typescript - 5](https://img.shields.io/badge/typescript-5-grey.svg?style=for-the-badge&logo=typescript&logoColor=white&labelColor=007ACC)]([https://](https://www.typescriptlang.org/)) [![Zod - 4](https://img.shields.io/badge/Zod-4-grey.svg?style=for-the-badge&logo=zod&logoColor=white&labelColor=408AFE)](https://zod.dev)

**English** | [**中文**](/README_ZH.md)

</div>

## Adapted Version

Sing-box v1.12.2

## Usage

### JSON Schema / For Users

You can use it in Visual Studio Code or other JSON Schema-supported editors. Open the `sing-box` configuration JSON file and add the following at the top of the file:

```json
{
  "$schema": "https://unpkg.com/@black-duty/sing-box-schema@1.12.2/schema.json"
}
```

Or use the Chinese version:

```json
{
  "$schema": "https://unpkg.com/@black-duty/sing-box-schema@1.12.2/schema.zh.json"
}
```

### Zod Schema / For Developers

If you are a developer working with `sing-box` configurations in a TypeScript or JavaScript project, you can use the `Configuration` Schema to validate your configuration objects programmatically.

```typescript
import { Configuration } from '@black-duty/sing-box-schema';

// Your sing-box configuration object
const myConfig = {
  "log": {
    "level": "info"
  },
  "inbounds": [
    {
      "type": "socks",
      "listen": "127.0.0.1",
      "listen_port": 1080
    }
  ],
  "outbounds": [
    {
      "type": "direct"
    }
  ]

  // ... more configurations
};

try {
  const validatedConfig = Configuration.parse(myConfig);
  console.log('Configuration is valid!', validatedConfig);
} catch (error) {
  console.error('Configuration is invalid:', error);
  // 'error' will be a ZodError instance with detailed validation issues.
}
```

## Installation

Install this library using your favorite package manager:

```bash
bun add @black-duty/sing-box-schema
# or
npm install @black-duty/sing-box-schema
# or
yarn add @black-duty/sing-box-schema
```

### Local Development and Contributions

If you wish to contribute to the `sing-box-schema` project or develop locally, please follow these steps:

1.  **Clone the repository**:
```bash
git clone https://github.com/BlackDuty/sing-box-schema.git
cd sing-box-schema
```
2.  **Install dependencies**:
```bash
bun install
```
3.  **Build the project**:
```bash
bun run build
```
This will compile the TypeScript code and generate the JSON Schema files in the `dist` directory.
4.  **Code Linting and Formatting**:
```bash
bun run lint
```
5.  **Manually Generate JSON Schema**:
```bash
bun run generate
```
This command is automatically run during the `build` process, but you can run it manually if needed.

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.