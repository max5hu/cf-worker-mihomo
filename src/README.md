# 代理配置转换工具 — 重构说明

## 目录结构

```
src_refactored/
├── worker.js                    # Cloudflare Workers 入口文件（原 _worker.js）
├── vercel.js                    # Vercel Serverless Function 入口文件
│
├── core/
│   └── handler.js               # 核心请求处理器（两个入口共用）
│
├── config/
│   └── constants.js             # 全局常量与运行时配置构建
│
├── utils/
│   ├── codec.js                 # Base64 编解码工具
│   ├── http.js                  # HTTP 请求封装（含 Content-Disposition 修复）
│   └── parser.js                # 查询参数解析、订阅链接分类
│
├── providers/
│   ├── mihomo.js                # Mihomo 配置生成（原 mihomo.js）
│   ├── mihomo-proxies.js        # Mihomo 节点获取与处理（原 proxies.js）
│   ├── singbox.js               # Singbox 配置生成（原 singbox.js）
│   ├── singbox-outbounds.js     # Singbox 节点获取与处理（原 outbounds.js）
│   ├── v2ray.js                 # V2Ray 配置获取（原 v2ray.js）
│   └── rules.js                 # 规则模板、包名列表、CIDR 列表获取
│
└── ui/
    ├── template.js              # HTML 页面生成器（原 page.js）
    ├── styles.js                # CSS 样式（原 css.js）
    └── config-options.js        # 前端配置选项数据（原 utils.js 中的 configs/modes）
```

## 文件对照表

| 原文件 | 新文件 | 变更说明 |
| --- | --- | --- |
| `_worker.js` | `worker.js` | 去掉下划线前缀；业务逻辑全部提取到 `core/handler.js` |
| `vercel.js` | `vercel.js` | 保持文件名；业务逻辑全部提取到 `core/handler.js` |
| `utils.js` | `config/constants.js` | 常量与环境变量构建 |
| `utils.js` | `utils/codec.js` | Base64 编解码 |
| `utils.js` | `utils/http.js` | HTTP 请求封装 |
| `utils.js` | `utils/parser.js` | 参数解析与链接分类 |
| `utils.js` | `providers/rules.js` | 规则/包名/CIDR 数据获取 |
| `utils.js` | `ui/config-options.js` | 前端配置选项生成 |
| `mihomo.js` | `providers/mihomo.js` | 重命名至 providers 目录 |
| `proxies.js` | `providers/mihomo-proxies.js` | 明确语义，避免与其他 proxies 混淆 |
| `singbox.js` | `providers/singbox.js` | 重命名至 providers 目录 |
| `outbounds.js` | `providers/singbox-outbounds.js` | 明确语义，与 mihomo-proxies 对称 |
| `v2ray.js` | `providers/v2ray.js` | 重命名至 providers 目录 |
| `page.js` | `ui/template.js` | 语义更清晰 |
| `css.js` | `ui/styles.js` | 语义更清晰，归入 ui 目录 |

## 主要重构改进

### 1. 消除重复代码

`worker.js` 和 `vercel.js` 原本各自包含完整的参数解析和路由分发逻辑（约 70 行重复代码）。
重构后，两个入口文件仅负责平台适配（解析 Request/req 对象、写入 Response/res 对象），
所有业务逻辑统一由 `core/handler.js` 处理。

### 2. 拆分 utils.js

原 `utils.js` 混杂了 7 种不同职责的代码（470+ 行）。重构后按职责拆分为 6 个文件，
每个文件职责单一，行数均在 120 行以内。

### 3. 统一命名规范

全面采用标准驼峰命名法，消除原有的混合风格：

| 原函数名 | 新函数名 |
| --- | --- |
| `getmihomo_config` | `generateMihomoConfig` |
| `getsingbox_config` | `generateSingboxConfig` |
| `getv2ray_config` | `generateV2rayConfig` |
| `Top_Data` | `fetchTemplate` |
| `Rule_Data` | `fetchRule` |
| `fetchpackExtract` | `fetchAndroidPackageList` |
| `fetchipExtract` | `fetchCnIpCidrList` |
| `getMihomo_Proxies_Data` | `fetchMihomoProxies` |
| `getSingbox_Outbounds_Data` | `fetchSingboxOutbounds` |
| `buildApiUrl` | `buildConvertApiUrl` |
| `fetchResponse` | `fetchRemote` |
| `splitUrlsAndProxies` | `splitSubscriptionsAndProxies` |
| `base64DecodeUtf8` | `base64Decode` |
| `base64EncodeUtf8` | `base64Encode` |

### 4. 改进错误处理

- `fetchRemote` 现在在网络请求失败时抛出包含 URL 信息的具体错误，而非静默返回 `true`。
- `fetchAndroidPackageList` 和 `fetchCnIpCidrList` 对每个 URL 单独处理错误，单个失败不影响其他 URL。
- Singbox `adgdns` 配置修复：原代码使用 `flatMap` 但未重新赋值（静默 Bug），重构后改为 `map` 并正确赋值。

### 5. 模块依赖关系

```
worker.js / vercel.js
    └── core/handler.js
            ├── config/constants.js
            │       └── utils/codec.js
            ├── utils/parser.js
            ├── providers/mihomo.js
            │       ├── providers/rules.js
            │       │       └── utils/http.js
            │       ├── providers/mihomo-proxies.js
            │       │       └── utils/http.js
            │       └── utils/parser.js
            ├── providers/singbox.js
            │       ├── providers/rules.js
            │       ├── providers/singbox-outbounds.js
            │       │       └── utils/http.js
            │       └── utils/parser.js
            ├── providers/v2ray.js
            │       └── utils/http.js
            └── ui/template.js
                    ├── ui/styles.js
                    └── ui/config-options.js
```
