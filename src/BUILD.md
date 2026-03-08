# 编译指南

本项目使用 `esbuild` 进行编译，将源代码打包成可部署的格式。

## 快速开始

### 安装依赖

```bash
npm install
```

### 编译代码

```bash
npm run build
```

这将生成两个编译后的文件：

- `dist/worker.js` - Cloudflare Workers 入口（ESM 格式，约 58.8 KB）
- `dist/vercel.js` - Vercel Serverless Function 入口（ESM 格式，约 58.8 KB）

## 编译命令

### 1. 标准编译

```bash
npm run build
# 或
node esbuild.js
```

**输出：**
- `dist/worker.js`
- `dist/vercel.js`

**特点：**
- 代码已最小化（minify）
- 移除了源代码注释
- 优化了文件大小
- 适合生产环境部署

### 2. 监听模式

```bash
npm run watch
# 或
node esbuild.js --watch
```

**用途：** 在开发过程中，自动监听源文件变化并重新编译。

**特点：**
- 实时编译
- 快速反馈
- 适合开发调试

### 3. 分析模式

```bash
npm run analyze
# 或
node esbuild.js --analyze
```

**输出：**
- `dist/worker.meta.json` - Worker 编译分析报告
- `dist/vercel.meta.json` - Vercel 编译分析报告

**用途：** 分析编译后的模块依赖关系和大小分布。

### 4. 帮助信息

```bash
node esbuild.js --help
```

## 编译配置详解

### Worker 编译配置

```javascript
{
    format: 'esm',              // 输出格式：ES Module
    platform: 'neutral',        // 平台：中立（兼容 Cloudflare Workers）
    target: ['es2020'],         // 目标 JavaScript 版本
    bundle: true,               // 打包所有依赖
    minify: true,               // 最小化代码
    external: ['yaml'],         // 外部依赖（不打包）
}
```

**说明：**
- Cloudflare Workers 运行在 V8 引擎上，支持现代 JavaScript 特性
- `external: ['yaml']` 表示 `yaml` 模块不会被打包，需要在 Workers 环境中单独提供
- ESM 格式是 Cloudflare Workers 的标准格式

### Vercel 编译配置

```javascript
{
    format: 'esm',              // 输出格式：ES Module
    platform: 'node',           // 平台：Node.js
    target: ['node18'],         // 目标 Node.js 版本
    bundle: true,               // 打包所有依赖
    minify: true,               // 最小化代码
    external: ['yaml'],         // 外部依赖（不打包）
}
```

**说明：**
- Vercel 使用 Node.js 18+ 运行时
- ESM 格式需要 Node.js 12.20+ 支持
- 如需使用 CommonJS 格式，修改 `format: 'cjs'`

## 文件大小

| 文件 | 大小 | 说明 |
| --- | --- | --- |
| `dist/worker.js` | ~159.5 KB | Cloudflare Workers 入口（包含所有依赖） |
| `dist/vercel.js` | ~171.1 KB | Vercel Serverless Function 入口（包含所有依赖） |

**注：** 文件大小包含了所有依赖（如 `yaml` 模块），无需在部署环境中额外安装 npm 包。两个文件大小略有差异是因为 Vercel 版本包含了 Node.js 兼容层。

## 部署指南

### Cloudflare Workers

1. 编译代码：
   ```bash
   npm run build
   ```

2. 将 `dist/worker.js` 内容复制到 Cloudflare Workers 编辑器

3. 在 Workers 的环境变量中配置以下 Key：
   - `IMG` - 背景图片地址
   - `SUB` - 订阅转换后端地址
   - `MIHOMOTOP` - Mihomo 顶层配置模板地址
   - `SINGBOX_1_11` / `SINGBOX_1_12` / `SINGBOX_1_13` - Singbox 版本模板
   - `BEIAN` - 备案文字
   - `BEIANURL` - 备案链接
   - `MIHOMO` / `SINGBOX` - 自定义规则模板地址

4. 部署

### Vercel

1. 编译代码：
   ```bash
   npm run build
   ```

2. 将 `dist/vercel.js` 放置在 Vercel 项目的 `/api` 目录下（或根据 `vercel.json` 配置的路由）

3. 在 Vercel 的环境变量面板中配置与 Cloudflare 相同的 Key

4. 部署

## 常见问题

### Q: 为什么两个文件大小有所不同？

A: 因为两个入口文件都包含了完整的业务逻辑和所有依赖。Worker 文件约 159.5 KB，Vercel 文件约 171.1 KB，其中差异是因为 Vercel 版本包含了 Node.js 兼容层。

### Q: 可以改成 CommonJS 格式吗？

A: 可以。修改 `esbuild.js` 中的 `format: 'cjs'` 即可。但需要注意 Cloudflare Workers 不支持 CommonJS，仅 Vercel 可用。不过当前使用 ESM 格式并打包所有依赖，两个平台都应该正常工作。

### Q: 如何减小文件大小？

A: 
- 使用 `npm run analyze` 模式查看哪些模块占用空间最大
- 在 `esbuild.js` 中添加 `external: ['yaml']` 以排除特定依赖（但需要在部署环境中安装）
- 考虑使用更轻量的 YAML 库替代 `yaml` 模块

### Q: 编译失败怎么办？

A: 
1. 检查所有源文件的 import/export 是否正确
2. 确保所有依赖都已安装：`npm install`
3. 查看错误信息，通常会指出具体的问题位置
4. 使用 `npm run analyze` 生成分析报告，检查依赖关系

## 脚本源码

`esbuild.js` 是一个独立的编译脚本，包含以下功能：

- **标准编译**：打包并最小化代码
- **监听模式**：实时编译
- **分析模式**：生成编译分析报告
- **错误处理**：详细的错误提示
- **进度显示**：实时显示编译进度和文件大小

## 相关文件

- `esbuild.js` - 编译脚本
- `package.json` - 项目配置和依赖
- `worker.js` - Cloudflare Workers 入口
- `vercel.js` - Vercel Serverless Function 入口
- `core/handler.js` - 核心业务逻辑（两个入口共用）
