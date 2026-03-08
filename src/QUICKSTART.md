# 快速开始指南

欢迎使用代理配置转换工具！本指南将帮助您快速上手。

---

## 目录

1. [本地开发](#本地开发)
2. [部署到 Cloudflare Workers](#部署到-cloudflare-workers)
3. [部署到 Vercel](#部署到-vercel)
4. [常用命令](#常用命令)

---

## 本地开发

### 1. 克隆或下载项目

```bash
git clone <repository-url>
cd src_refactored
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填入实际的环境变量值。

### 4. 启动本地开发服务器

#### 选项 A：Cloudflare Workers 本地开发

```bash
npm run cf:dev
```

服务器将运行在 `http://127.0.0.1:8787`

#### 选项 B：Vercel 本地开发

```bash
npm run vercel:dev
```

服务器将运行在 `http://localhost:3000`

### 5. 测试

在浏览器中访问 `http://localhost:8787`（或 `http://localhost:3000`）

您应该看到配置转换工具的前端界面。

### 6. 开发与调试

在编辑源代码时，可以在另一个终端运行以下命令进行实时编译：

```bash
npm run watch
```

---

## 部署到 Cloudflare Workers

### 前置要求

- Cloudflare 账户
- 已验证的信用卡（某些功能需要）

### 部署步骤

#### 1. 登录 Cloudflare

```bash
npm run cf:login
```

#### 2. 配置 wrangler.toml

编辑 `wrangler.toml`，修改 Worker 名称和路由：

```toml
name = "my-proxy-converter"

[env.production]
routes = [
  { pattern = "example.com/*", zone_name = "example.com" }
]
```

#### 3. 设置环境变量

在 Cloudflare 仪表板中配置环境变量，或使用命令行：

```bash
npm run cf:secret
```

按照提示输入环境变量名和值。

#### 4. 部署

```bash
npm run cf:deploy
```

部署完成后，您会看到 Worker 的 URL。

#### 5. 验证

访问部署后的 URL 进行测试。

### 管理部署

```bash
# 查看部署历史
wrangler deployments list

# 查看实时日志
wrangler tail

# 回滚到上一个版本
wrangler rollback

# 登出
npm run cf:logout
```

---

## 部署到 Vercel

### 前置要求

- Vercel 账户
- GitHub 账户（推荐，用于 Git 集成）

### 部署步骤

#### 1. 登录 Vercel

```bash
npm run vercel:login
```

#### 2. 初始化项目

```bash
vercel
```

按照提示完成项目初始化。

#### 3. 设置环境变量

在 Vercel 仪表板中配置环境变量：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入您的项目
3. 点击 **Settings** > **Environment Variables**
4. 添加所需的环境变量

#### 4. 部署

```bash
npm run vercel:deploy
```

部署完成后，您会看到生成的 URL。

#### 5. 验证

访问部署后的 URL 进行测试。

### 管理部署

```bash
# 查看部署历史
vercel list deployments

# 查看构建日志
vercel logs

# 回滚到上一个版本
vercel rollback

# 登出
npm run vercel:logout
```

---

## 常用命令

### 编译相关

| 命令 | 说明 |
| --- | --- |
| `npm run build` | 编译代码到 `dist/` 目录 |
| `npm run watch` | 监听文件变化并自动编译 |
| `npm run analyze` | 生成编译分析报告 |

### 开发相关

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动 Cloudflare Workers 本地开发服务器 |
| `npm run cf:dev` | 启动 Cloudflare Workers 本地开发服务器 |
| `npm run vercel:dev` | 启动 Vercel 本地开发服务器 |

### Cloudflare Workers 相关

| 命令 | 说明 |
| --- | --- |
| `npm run cf:login` | 登录 Cloudflare 账户 |
| `npm run cf:logout` | 登出 Cloudflare 账户 |
| `npm run cf:deploy` | 编译并部署到 Cloudflare Workers |
| `npm run cf:secret` | 设置 Cloudflare 环境变量 |

### Vercel 相关

| 命令 | 说明 |
| --- | --- |
| `npm run vercel:login` | 登录 Vercel 账户 |
| `npm run vercel:logout` | 登出 Vercel 账户 |
| `npm run vercel:deploy` | 编译并部署到 Vercel |

---

## 环境变量说明

### 必需变量

| 变量 | 说明 | 示例 |
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

### 可选变量

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `MIHOMO` | 自定义 Mihomo 规则 | `https://example.com/custom-mihomo.yaml` |
| `SINGBOX` | 自定义 Singbox 规则 | `https://example.com/custom-singbox.yaml` |

---

## 故障排除

### 问题：本地开发无法启动

**解决方案：**
1. 确认 Node.js 版本 >= 18：`node --version`
2. 重新安装依赖：`rm -rf node_modules && npm install`
3. 检查 `.env.local` 文件是否存在且格式正确

### 问题：部署失败

**解决方案：**
1. 确认已登录：`npm run cf:login` 或 `npm run vercel:login`
2. 检查编译是否成功：`npm run build`
3. 查看详细错误信息

### 问题：环境变量未生效

**解决方案：**
1. 确认环境变量已正确配置
2. 重新部署以应用新的环境变量
3. 检查变量名称是否正确（区分大小写）

---

## 下一步

- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解详细的部署指南
- 查看 [BUILD.md](./BUILD.md) 了解编译配置
- 查看 [README.md](./README.md) 了解项目结构

---

## 获取帮助

如遇到问题，请：

1. 查看本指南的"故障排除"部分
2. 查看其他文档（DEPLOYMENT.md、BUILD.md、README.md）
3. 查看平台官方文档：
   - [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
   - [Vercel 文档](https://vercel.com/docs)

---

祝您使用愉快！🚀
