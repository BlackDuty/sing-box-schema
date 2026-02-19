<div align="center">

# Sing-box Schema <br> ✍️ 📦

> 为代码编辑器 / TypeScript 项目提供类型安全的 [**sing-box**](https://sing-box.sagernet.org/) 配置语法支持

[![Version - v1.13.0-rc.4](https://img.shields.io/badge/Version-v1.13.0--rc.4-yellow?style=for-the-badge&logo=task&logoColor=white)](https://github.com/SagerNet/sing-box/tree/v1.13.0-rc.4) [![JSON Schema - Draft 2020-12](/badges/JSON_Schema-Draft_2020--12-white.svg)](https://json-schema.org/draft/2020-12) [![Typescript - 5](https://img.shields.io/badge/typescript-5-grey.svg?style=for-the-badge&logo=typescript&logoColor=white&labelColor=007ACC)]([https://](https://www.typescriptlang.org/)) [![Zod - 4](https://img.shields.io/badge/Zod-4-grey.svg?style=for-the-badge&logo=zod&logoColor=white&labelColor=408AFE)](https://zod.dev)

[**English**](/README.md) | **中文**

</div>

## 适配版本

Sing-box v1.13.x

本项目的标签与 `sing-box` 项目版本对应。切换不同的标签以获取与 `sing-box` 不同版本兼容的配置格式。

## 分支说明

本仓库包含以下分支，分别适配不同版本的 `sing-box`：

-   **main**: 主分支，包含最新提交。
-   **stable**: 适配 sing-box 的稳定版本（当前为 v1.13.x）。
-   **legacy**: 适配 sing-box 的旧版本（如 Play Store / App Store 中未能更新的旧版本），当前为 v1.11.x。
-   **🚧 next**: \[工作中\] 适配 sing-box 的积极开发版本（当前为 v1.13.x）。

建议开发者可以切换不同的分支以适配进度，而对于普通用户建议使用 tag 来定位版本。

## 使用方法

### JSON Schema / 面向用户

你可以在 Visual Studio Code 中或其他支持 JSON Schema 的编辑器中使用，打开用于 `sing-box` 的配置 JSON 文件，在文件头部添加

```json
{
  "$schema": "https://unpkg.com/@black-duty/sing-box-schema@1.13.0-rc.4/schema.json"
}
```

或使用中文版本

```json
{
  "$schema": "https://unpkg.com/@black-duty/sing-box-schema@1.13.0-rc.4/schema.zh.json"
}
```

除了 Unpkg 的 npm 镜像之外，你还可以使用：

<details>
<summary>Github 仓库直链</summary>

```json
{
  "$schema": "https://raw.githubusercontent.com/BlackDuty/sing-box-schema/refs/tags/v1.13.0-rc.4/schema.json"
}
```

或使用中文版本

```json
{
  "$schema": "https://raw.githubusercontent.com/BlackDuty/sing-box-schema/refs/tags/v1.13.0-rc.4/schema.zh.json"
}
```
</details>
<details>
<summary>Github Release</summary>

```json
{
  "$schema": "https://github.com/BlackDuty/sing-box-schema/releases/download/v1.13.0-rc.4/schema.json"
}
```

或使用中文版本

```json
{
  "$schema": "https://github.com/BlackDuty/sing-box-schema/releases/download/v1.13.0-rc.4/schema.zh.json"
}
```
</details>

### Zod Schema / 面向开发者

如果您是开发者，在 TypeScript 或 JavaScript 项目中处理 `sing-box` 配置，您可以使用 `Configuration` Schema 以编程方式验证您的配置对象。

```typescript
import { Configuration } from '@black-duty/sing-box-schema';

// 您的 sing-box 配置对象
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

  // ... 更多配置
};

try {
  const validatedConfig = Configuration.parse(myConfig);
  console.log('配置有效！', validatedConfig);
} catch (error) {
  console.error('配置无效：', error);
  // 'error' 将是一个 ZodError 实例，包含详细的验证问题。
}
```

## 安装

使用您喜欢的包管理器安装此库：

```bash
bun add @black-duty/sing-box-schema
# 或
npm install @black-duty/sing-box-schema
# 或
yarn add @black-duty/sing-box-schema
```


### 本地开发与贡献

如果您希望为 `sing-box-schema` 项目做出贡献或进行本地开发，请遵循以下步骤：

1.  **克隆仓库**：
```bash
git clone https://github.com/BlackDuty/sing-box-schema.git
cd sing-box-schema
```
2.  **安装依赖**：
```bash
bun install
```
3.  **构建项目**：
```bash
bun run build
```
这将编译 TypeScript 代码并在 `dist` 目录中生成 JSON Schema 文件。
45.  **代码检查与格式化**：
```bash
bun run lint
```
5.  **手动生成 JSON Schema**：
```bash
bun run generate
```
此命令在 `build` 过程中会自动运行，但您也可以根据需要手动运行它。

欢迎贡献！请随时提出问题或提交拉取请求。

## 许可证

本项目采用 MIT 许可证。