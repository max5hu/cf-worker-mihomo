# 项目重构与部署完整方案总结

## 项目概览

本项目是一个支持 **Cloudflare Workers** 和 **Vercel** 的代理配置转换工具，支持 Mihomo、Singbox 和 V2Ray 格式。

### 重构成果

| 指标 | 数值 |
| --- | --- |
| 源代码文件数 | 16 个 |
| 源代码总行数 | 2,584 行 |
| 编译产物数 | 2 个 |
| Worker 编译大小 | 159.5 KB |
| Vercel 编译大小 | 171.1 KB |
| 文档文件数 | 8 个 |
| 配置文件数 | 4 个 |

---

## 核心改进

### 1. 代码重构

**原始结构问题：**
- 两个入口文件各自包含 70+ 行重复代码
- utils.js 混杂 7 种不同职责，超过 470 行
- 命名规范混乱（混合下划线和驼峰）
- 存在静默 Bug（Singbox adgdns 配置未生效）

**重构方案：**
- 消除入口文件重复代码，统一由 core/handler.js 处理
- 按职责拆分 utils.js 为 6 个专用模块
- 统一采用标准驼峰命名法（14 个函数名规范化）
- 修复 Singbox adgdns 配置 Bug
- 改进错误处理机制

### 2. 编译与打包

**编译工具：** esbuild（快速、高效）

**打包策略：** 所有依赖完整打包（包括 yaml 模块）

**编译性能：**
- Worker 编译：26ms
- Vercel 编译：19ms
- 总耗时：50ms

**输出产物：**
- dist/worker.js：159.5 KB（Cloudflare Workers）
- dist/vercel.js：171.1 KB（Vercel）

### 3. 部署与开发指令

**npm scripts 完整列表：**
- npm run build - 编译代码
- npm run watch - 监听文件变化并自动编译
- npm run analyze - 生成编译分析报告
- npm run dev - 启动 CF Workers 本地开发
- npm run cf:deploy - 编译并部署到 CF Workers
- npm run vercel:deploy - 编译并部署到 Vercel

---

## 快速开始

### 本地开发（5 分钟）

```bash
npm install
cp .env.local.example .env.local
npm run dev
# 访问 http://localhost:8787
```

### 部署到 Cloudflare Workers

```bash
npm run cf:login
npm run cf:deploy
```

### 部署到 Vercel

```bash
npm run vercel:login
npm run vercel:deploy
```

---

## 文档体系

| 文档 | 用途 |
| --- | --- |
| README.md | 项目结构与重构说明 |
| QUICKSTART.md | 5 分钟快速上手 |
| BUILD.md | 编译配置详解 |
| DEPLOYMENT.md | 详细部署指南 |
| BUNDLING.md | 依赖打包说明 |

---

## 项目特性

### 支持的格式

- Mihomo / Clash Meta：完整支持
- Singbox：支持 1.11.x / 1.12.x / 1.13.x 版本
- V2Ray：通过转换后端支持

### 高级功能

- 分应用代理（Android）
- 分 IP CIDR 代理（iOS/macOS/Windows/Linux）
- 去广告 DNS 配置
- TLS 分段（绕过防火墙）
- UDP 分段
- Tailscale 集成

---

## 技术栈

| 技术 | 版本 |
| --- | --- |
| Node.js | 18+ |
| esbuild | ^0.27.3 |
| yaml | ^2.8.2 |
| Wrangler | ^3.80.0 |
| Vercel CLI | ^37.0.0 |

---

**项目完成时间：** 2026-03-08  
**版本：** 1.0.0
