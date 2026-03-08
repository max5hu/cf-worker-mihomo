# 部署指南

本项目支持两种主流的 Serverless 平台部署：**Cloudflare Workers** 和 **Vercel**。本文档提供详细的部署步骤。

---

## 目录

1. [Cloudflare Workers 部署](#cloudflare-workers-部署)
2. [Vercel 部署](#vercel-部署)
3. [环境变量配置](#环境变量配置)
4. [开发与调试](#开发与调试)
5. [常见问题](#常见问题)

---

## Cloudflare Workers 部署

### 前置要求

- Node.js 18+ 和 npm
- Cloudflare 账户
- Wrangler CLI（Cloudflare 官方工具）

### 安装步骤

#### 1. 安装依赖

```bash
npm install
```

#### 2. 登录 Cloudflare

```bash
npm run cf:login
```

系统会打开浏览器，要求您授权 Wrangler 访问您的 Cloudflare 账户。

#### 3. 配置 wrangler.toml

编辑 `wrangler.toml` 文件，修改以下内容：

```toml
name = "your-worker-name"  # 修改为您的 Worker 名称

[env.production]
routes = [
  { pattern = "your-domain.com/*", zone_name = "your-domain.com" }  # 修改为您的域名
]
```

#### 4. 设置环境变量

**重要提示：** 编译后的 `dist/worker.js` 已经包含了所有依赖（包括 `yaml` 模块），不需要在 Cloudflare Workers 环境中额外安装 npm 包。

使用 Wrangler 命令行设置环境变量：

```bash
# 设置背景图片地址
npm run cf:secret
# 输入 IMG，然后输入图片地址

# 设置订阅转换后端
npm run cf:secret
# 输入 SUB，然后输入后端地址

# 设置其他环境变量
npm run cf:secret
# 输入 MIHOMOTOP、SINGBOX_1_11、SINGBOX_1_12 等
```

**或者** 在 Cloudflare 仪表板中手动配置：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **您的 Worker** > **Settings** > **Environment variables**
3. 添加以下变量：

| Key | 说明 | 示例 |
| --- | --- | --- |
| `IMG` | 背景图片地址 | `https://example.com/bg.jpg` |
| `SUB` | 订阅转换后端地址 | `https://sub-store.example.com` |
| `MIHOMOTOP` | Mihomo 顶层配置 | `https://example.com/mihomo.yaml` |
| `SINGBOX_1_11` | Singbox 1.11 配置 | `https://example.com/singbox-1.11.yaml` |
| `SINGBOX_1_12` | Singbox 1.12 配置 | `https://example.com/singbox-1.12.yaml` |
| `SINGBOX_1_12_ALPHA` | Singbox 1.12 alpha 配置 | `https://example.com/singbox-1.12-alpha.yaml` |
| `SINGBOX_1_13` | Singbox 1.13 配置 | `https://example.com/singbox-1.13.yaml` |
| `BEIAN` | 备案文字 | `ICP备案号：xxxxx` |
| `BEIANURL` | 备案链接 | `https://beian.miit.gov.cn` |
| `MIHOMO` | 自定义 Mihomo 规则（可选） | `https://example.com/custom-mihomo.yaml` |
| `SINGBOX` | 自定义 Singbox 规则（可选） | `https://example.com/custom-singbox.yaml` |

#### 5. 编译并部署

```bash
npm run cf:deploy
```

此命令会：
1. 编译源代码到 `dist/worker.js`
2. 使用 Wrangler 部署到 Cloudflare Workers

#### 6. 验证部署

部署完成后，您可以通过以下方式验证：

```bash
# 查看 Worker 状态
wrangler deployments list

# 查看 Worker 日志
wrangler tail
```

或访问您配置的域名/路由进行测试。

### 本地开发

在部署前，可以在本地进行开发和测试：

```bash
npm run cf:dev
```

此命令会启动本地开发服务器，通常运行在 `http://127.0.0.1:8787`。

**注意：** 本地开发时，环境变量需要在 `wrangler.toml` 中配置或通过 `.env.local` 文件提供。

---

## Vercel 部署

### 前置要求

- Node.js 18+ 和 npm
- Vercel 账户
- Vercel CLI

### 安装步骤

#### 1. 安装依赖

```bash
npm install
```

#### 2. 登录 Vercel

```bash
npm run vercel:login
```

系统会打开浏览器，要求您授权 Vercel CLI 访问您的 Vercel 账户。

#### 3. 初始化 Vercel 项目

```bash
vercel
```

按照提示完成项目初始化：
- 选择 **Create a new project**
- 输入项目名称
- 选择 **Other** 作为框架
- 确认项目设置

#### 4. 配置环境变量

**重要提示：** 编译后的 `dist/vercel.js` 已经包含了所有依赖（包括 `yaml` 模块），不需要在 Vercel 环境中额外安装 npm 包。

在 Vercel 仪表板中配置环境变量：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入您的项目
3. 点击 **Settings** > **Environment Variables**
4. 添加以下变量（与 Cloudflare 相同）：

| Key | 说明 |
| --- | --- |
| `IMG` | 背景图片地址 |
| `SUB` | 订阅转换后端地址 |
| `MIHOMOTOP` | Mihomo 顶层配置 |
| `SINGBOX_1_11` | Singbox 1.11 配置 |
| `SINGBOX_1_12` | Singbox 1.12 配置 |
| `SINGBOX_1_12_ALPHA` | Singbox 1.12 alpha 配置 |
| `SINGBOX_1_13` | Singbox 1.13 配置 |
| `BEIAN` | 备案文字 |
| `BEIANURL` | 备案链接 |
| `MIHOMO` | 自定义 Mihomo 规则（可选） |
| `SINGBOX` | 自定义 Singbox 规则（可选） |

#### 5. 编译并部署

```bash
npm run vercel:deploy
```

此命令会：
1. 编译源代码到 `dist/vercel.js`
2. 部署到 Vercel 生产环境

#### 6. 验证部署

部署完成后，Vercel 会为您分配一个 URL（通常形如 `https://your-project.vercel.app`）。

访问该 URL 进行测试。

### 本地开发

在部署前，可以在本地进行开发和测试：

```bash
npm run vercel:dev
```

此命令会启动本地开发服务器，通常运行在 `http://localhost:3000`。

**注意：** 本地开发时，需要在 `.env.local` 文件中配置环境变量。

---

## 环境变量配置

### 必需变量

以下变量在两个平台上都是必需的：

| Key | 说明 | 默认值 |
| --- | --- | --- |
| `IMG` | 背景图片地址 | `https://t.alcy.cc/ycy` |
| `SUB` | 订阅转换后端地址 | `https://sub-start-nodejs.pages.dev` |
| `MIHOMOTOP` | Mihomo 顶层配置 | 内置默认值 |
| `SINGBOX_1_11` | Singbox 1.11 配置 | 内置默认值 |
| `SINGBOX_1_12` | Singbox 1.12 配置 | 内置默认值 |
| `SINGBOX_1_12_ALPHA` | Singbox 1.12 alpha 配置 | 内置默认值 |
| `SINGBOX_1_13` | Singbox 1.13 配置 | 内置默认值 |
| `BEIAN` | 备案文字 | 内置默认值 |
| `BEIANURL` | 备案链接 | 内置默认值 |

### 可选变量

| Key | 说明 | 用途 |
| --- | --- | --- |
| `MIHOMO` | 自定义 Mihomo 规则模板 | 覆盖默认 Mihomo 规则 |
| `SINGBOX` | 自定义 Singbox 规则模板 | 覆盖默认 Singbox 规则 |

### 环境变量获取

如果您不确定某些变量的值，可以参考以下资源：

- **Mihomo 配置**：[Mihomo 官方仓库](https://github.com/MetaCubeX/mihomo)
- **Singbox 配置**：[Singbox 官方文档](https://sing-box.sagernet.org/)
- **订阅转换后端**：[Sub-Store](https://github.com/sub-store-org/Sub-Store)

---

## 开发与调试

### 本地开发流程

1. **启动开发服务器**：
   ```bash
   npm run dev
   ```
   或指定平台：
   ```bash
   npm run cf:dev      # Cloudflare Workers
   npm run vercel:dev  # Vercel
   ```

2. **修改代码**：
   编辑源文件（`worker.js`、`vercel.js` 或 `core/`、`utils/` 等目录下的文件）

3. **自动编译**（可选）：
   在另一个终端运行：
   ```bash
   npm run watch
   ```
   此命令会监听文件变化并自动重新编译

4. **测试**：
   访问本地开发服务器地址进行测试

### 调试技巧

#### Cloudflare Workers

```bash
# 查看实时日志
npm run cf:tail

# 查看部署历史
wrangler deployments list

# 回滚到上一个版本
wrangler rollback
```

#### Vercel

```bash
# 查看构建日志
vercel logs

# 查看部署历史
vercel list deployments

# 回滚到上一个版本
vercel rollback
```

### 代码分析

生成编译分析报告，了解代码结构和依赖关系：

```bash
npm run analyze
```

此命令会生成 `dist/worker.meta.json` 和 `dist/vercel.meta.json`，包含详细的模块信息。

---

## 常见问题

### Q: 部署后访问返回 404

**A:** 检查以下几点：
1. 确认部署成功（查看部署日志）
2. 确认路由配置正确（`wrangler.toml` 或 `vercel.json`）
3. 确认环境变量已配置
4. 尝试访问根路径 `/` 而不是子路径

### Q: 环境变量未生效

**A:** 
1. 确认环境变量已在平台仪表板中配置
2. 重新部署以应用新的环境变量
3. 检查变量名称是否正确（区分大小写）
4. 在本地开发时，确认 `.env.local` 文件存在且包含相应变量

### Q: 编译失败

**A:**
1. 确认 Node.js 版本 >= 18
2. 运行 `npm install` 重新安装依赖
3. 删除 `node_modules` 和 `package-lock.json`，重新安装
4. 检查源代码中的语法错误

### Q: 本地开发与生产环境行为不一致

**A:**
1. 确认本地和生产环境的环境变量相同
2. 检查是否使用了平台特定的 API（如 Cloudflare KV）
3. 查看编译后的代码（`dist/` 目录）是否与预期一致

### Q: 如何在两个平台之间切换？

**A:** 
代码完全兼容两个平台。只需：
1. 在 Cloudflare 上部署：`npm run cf:deploy`
2. 在 Vercel 上部署：`npm run vercel:deploy`

两个平台会各自维护独立的部署和环境变量。

### Q: 如何自定义规则模板？

**A:**
1. 创建您自己的规则模板文件（YAML 格式）
2. 将其上传到可访问的 URL
3. 在环境变量中设置 `MIHOMO` 或 `SINGBOX`
4. 重新部署

### Q: 支持自定义域名吗？

**A:**
- **Cloudflare Workers**：支持，在 `wrangler.toml` 中配置 `routes`
- **Vercel**：支持，在 Vercel 仪表板中配置自定义域名

---

## 获取帮助

如遇到问题，请：

1. 查看本文档的"常见问题"部分
2. 查看项目的 `README.md` 和 `BUILD.md`
3. 查看平台官方文档：
   - [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
   - [Vercel 文档](https://vercel.com/docs)
4. 在项目的 GitHub Issues 中提问

---

## 许可证

本项目采用 ISC 许可证。详见 `LICENSE` 文件。
