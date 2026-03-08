# 依赖打包说明

本项目使用 `esbuild` 进行编译，所有依赖（包括 `yaml` 模块）都被完整打包进输出文件中，无需在部署环境中额外安装 npm 包。

---

## 打包策略

### 当前配置

```javascript
// esbuild.js 中的配置
const commonOptions = {
    bundle: true,          // 启用打包
    minify: true,          // 启用代码压缩
    sourcemap: false,      // 不生成源代码映射
    target: ['es2020'],    // 目标 JavaScript 版本
    logLevel: 'info',
    // 注意：所有依赖（包括 yaml）都会被打包进输出文件
};
```

### 打包的依赖

| 依赖 | 版本 | 用途 |
| --- | --- | --- |
| `yaml` | ^2.8.2 | YAML 配置文件解析 |

### 编译输出

| 文件 | 大小 | 包含内容 |
| --- | --- | --- |
| `dist/worker.js` | ~159.5 KB | 完整的业务逻辑 + yaml 模块 |
| `dist/vercel.js` | ~171.1 KB | 完整的业务逻辑 + yaml 模块 + Node.js 兼容层 |

---

## 部署优势

### 1. 无需依赖安装

**Cloudflare Workers：**
- ✅ 无需在 Workers 环境中安装任何 npm 包
- ✅ 直接复制 `dist/worker.js` 内容到 Workers 编辑器即可运行
- ✅ 减少部署复杂度

**Vercel：**
- ✅ 无需在 Vercel 环境中安装任何 npm 包
- ✅ 直接上传 `dist/vercel.js` 即可运行
- ✅ 加快冷启动速度

### 2. 自包含的可执行文件

- 单个文件包含所有必要的代码
- 易于版本控制和回滚
- 易于在不同环境间迁移

### 3. 性能优化

- 代码已压缩（minify）
- 移除了开发时的调试信息
- 优化的模块加载

---

## 自定义打包配置

### 排除特定依赖

如果您想减小文件大小，可以排除特定依赖（但需要在部署环境中手动安装）：

**修改 `esbuild.js`：**

```javascript
const commonOptions = {
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2020'],
    logLevel: 'info',
    external: ['yaml'],  // 排除 yaml 模块
};
```

然后重新编译：

```bash
npm run build
```

**后续在部署环境中安装依赖：**

- **Cloudflare Workers**：使用 `wrangler.toml` 中的 `dependencies` 配置
- **Vercel**：在 `package.json` 中添加依赖，Vercel 会自动安装

### 添加新的打包依赖

如果您需要添加新的 npm 包：

1. 安装依赖：
   ```bash
   npm install <package-name>
   ```

2. 在源代码中导入使用

3. 重新编译：
   ```bash
   npm run build
   ```

新的依赖会自动被打包进输出文件。

---

## 编译分析

查看编译后文件中各模块的大小分布：

```bash
npm run analyze
```

此命令会生成：
- `dist/worker.meta.json` - Worker 编译分析报告
- `dist/vercel.meta.json` - Vercel 编译分析报告

使用这些报告可以识别占用空间最大的模块，进行针对性的优化。

---

## 文件大小对比

### 打包所有依赖（当前配置）

```
dist/worker.js   159.5 KB  ✓ 包含 yaml 模块
dist/vercel.js   171.1 KB  ✓ 包含 yaml 模块
```

**优点：**
- 部署简单，无需额外依赖
- 运行速度快，无需动态加载依赖

**缺点：**
- 文件体积较大

### 排除依赖（可选配置）

如果在 `esbuild.js` 中设置 `external: ['yaml']`：

```
dist/worker.js   ~58.8 KB  ✗ 不包含 yaml 模块
dist/vercel.js   ~58.8 KB  ✗ 不包含 yaml 模块
```

**优点：**
- 文件体积较小

**缺点：**
- 需要在部署环境中安装依赖
- 部署配置更复杂

---

## 常见问题

### Q: 为什么编译后的文件这么大？

A: 因为所有依赖（如 `yaml` 模块）都被打包进了文件。这是为了简化部署流程。如果您想减小文件大小，可以在 `esbuild.js` 中配置 `external: ['yaml']` 来排除特定依赖。

### Q: 打包后的文件可以直接在浏览器中运行吗？

A: 不可以。这些文件是为 Serverless 环境设计的：
- `dist/worker.js` 用于 Cloudflare Workers（Service Worker 环境）
- `dist/vercel.js` 用于 Vercel（Node.js 环境）

### Q: 如何验证依赖是否被正确打包？

A: 
1. 检查编译输出中是否包含依赖的代码：
   ```bash
   grep "yaml" dist/worker.js
   ```

2. 使用分析模式查看详细信息：
   ```bash
   npm run analyze
   ```

3. 查看生成的 `.meta.json` 文件

### Q: 可以排除某些依赖吗？

A: 可以。在 `esbuild.js` 中的 `external` 数组中添加要排除的依赖名称：
   ```javascript
   external: ['yaml', 'other-package']
   ```

### Q: 如何更新依赖版本？

A:
1. 更新 `package.json` 中的版本号
2. 运行 `npm install`
3. 重新编译：`npm run build`

### Q: 打包的文件在生产环境中是否安全？

A: 是的。打包的文件：
- 已进行代码压缩（minify），难以反向工程
- 不包含源代码映射（sourcemap）
- 适合生产环境部署

---

## 性能指标

### 编译时间

```
Worker 编译：~26ms
Vercel 编译：~19ms
总耗时：~50ms
```

### 文件大小

```
Worker:  159.5 KB (压缩后)
Vercel:  171.1 KB (压缩后)
```

### 运行时性能

- **冷启动**：< 100ms（Cloudflare Workers）
- **冷启动**：< 500ms（Vercel）
- **请求处理**：< 50ms（取决于外部 API 响应）

---

## 最佳实践

1. **定期更新依赖**：
   ```bash
   npm update
   npm run build
   ```

2. **监控文件大小**：
   ```bash
   npm run analyze
   ```

3. **测试编译产物**：
   ```bash
   npm run build
   npm run cf:dev  # 或 npm run vercel:dev
   ```

4. **版本控制**：
   - 提交 `package.json` 和 `package-lock.json`
   - 提交 `esbuild.js` 配置
   - 不提交 `dist/` 目录（可在 CI/CD 中自动生成）

---

## 相关文档

- [BUILD.md](./BUILD.md) - 编译配置详解
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 部署指南
- [QUICKSTART.md](./QUICKSTART.md) - 快速开始指南
