/**
 * core/handler.js
 *
 * 核心请求处理模块。
 * 封装了请求参数解析、上下文构建、路由分发和响应构建的完整流程，
 * 供 worker.js（Cloudflare Workers）和 vercel.js（Vercel）两个入口文件共同调用，
 * 避免重复代码。
 */

import { buildRuntimeConfig } from '../config/constants.js';
import { parseQueryParams } from '../utils/parser.js';
import { generateMihomoConfig } from '../providers/mihomo.js';
import { generateSingboxConfig } from '../providers/singbox.js';
import { generateV2rayConfig } from '../providers/v2ray.js';
import { buildHtmlPage } from '../ui/template.js';

/** 响应中需要忽略的上游 Header（避免传输编码冲突） */
const IGNORED_UPSTREAM_HEADERS = new Set([
    'transfer-encoding',
    'content-length',
    'content-encoding',
    'connection',
]);

/**
 * 处理一次完整的 HTTP 请求，返回标准化的响应描述对象。
 *
 * @param {URL}    requestUrl - 已解析的请求 URL 对象
 * @param {string} userAgent  - 请求方的 User-Agent 字符串
 * @param {Object} env        - 环境变量对象（CF Workers 传 env，Vercel 传 process.env）
 * @returns {Promise<{status: number, headers: Object, body: string, isHtml: boolean}>}
 *   标准化响应描述，由各入口文件负责转换为平台特定的响应格式
 */
export async function handleRequest(requestUrl, userAgent, env = {}) {
    const runtimeConfig = buildRuntimeConfig(env);
    const queryParams   = parseQueryParams(requestUrl);

    // 构建请求上下文：合并运行时配置、查询参数及 User-Agent
    const ctx = {
        ...runtimeConfig,
        ...queryParams,
        userAgent,
        // 将 template 参数映射到 ctx.template（供各 provider 使用）
        template: queryParams.template,
    };

    // 无订阅链接时返回前端页面
    if (ctx.urls.length === 0 || ctx.urls[0] === '') {
        const html = await buildHtmlPage(ctx);
        return { status: 200, headers: {}, body: html, isHtml: true };
    }

    // 根据查询参数路由到对应的配置生成器
    const result = await dispatchToProvider(ctx);

    // 过滤上游响应头，避免传输编码冲突
    const filteredHeaders = {};
    for (const [key, value] of Object.entries(result.headers)) {
        if (!IGNORED_UPSTREAM_HEADERS.has(key.toLowerCase())) {
            filteredHeaders[key] = value;
        }
    }
    filteredHeaders['Content-Type']        = 'application/json; charset=utf-8';
    filteredHeaders['Profile-web-page-url'] = requestUrl.origin;

    return {
        status: result.status || 200,
        headers: filteredHeaders,
        body: result.data,
        isHtml: false,
    };
}

// ─── 私有辅助函数 ────────────────────────────────────────────────────────────

/**
 * 根据上下文参数将请求分发到对应的配置生成器。
 *
 * @param {Object} ctx - 请求上下文
 * @returns {Promise<{status: number, headers: Object, data: string}>}
 * @throws {Error} 若未指定任何有效的配置类型
 */
async function dispatchToProvider(ctx) {
    if (ctx.isSingbox) return generateSingboxConfig(ctx);
    if (ctx.isMihomo)  return generateMihomoConfig(ctx);
    if (ctx.isV2ray)   return generateV2rayConfig(ctx);

    throw new Error('未指定配置类型，请添加 singbox=true、mihomo=true 或 v2ray=true 参数');
}
