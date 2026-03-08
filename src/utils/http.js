/**
 * utils/http.js
 *
 * HTTP 请求工具函数。
 * 封装 fetch 调用，统一处理响应头清理、YAML/JSON 解析及错误处理。
 */

import YAML from 'yaml';

/** 默认 User-Agent，用于在未提供时模拟浏览器请求 */
const DEFAULT_USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

/**
 * 发起 GET 请求并返回解析后的响应对象。
 * 响应体会依次尝试 YAML 解析和 JSON 解析，若均失败则保留原始文本。
 *
 * @param {string} url - 请求地址
 * @param {string} [userAgent] - 自定义 User-Agent，不传则使用默认值
 * @returns {Promise<{status: number, headers: Object, data: any}>} 响应对象
 * @throws {Error} 当网络请求本身失败（如 DNS 解析失败、连接超时）时抛出错误
 */
export async function fetchRemote(url, userAgent = DEFAULT_USER_AGENT) {
    let response;
    try {
        response = await fetch(url, {
            method: 'GET',
            headers: { 'User-Agent': userAgent },
        });
    } catch (networkError) {
        throw new Error(`网络请求失败 [${url}]: ${networkError.message}`);
    }

    const headersObj = Object.fromEntries(response.headers.entries());

    // 修正可能包含非 ASCII 字符的 Content-Disposition 头
    const sanitizedContentDisposition = sanitizeContentDisposition(response.headers);
    if (sanitizedContentDisposition) {
        headersObj['content-disposition'] = sanitizedContentDisposition;
    }

    const text = await response.text();
    const data = parseResponseBody(text);

    return {
        status: response.status,
        headers: headersObj,
        data,
    };
}

/**
 * 构建订阅转换 API 的完整 URL。
 *
 * @param {string} rawUrl - 原始订阅链接（多个链接用逗号分隔）
 * @param {string} baseApi - 转换后端地址
 * @param {string} target - 目标客户端类型（如 'clash.meta', 'singbox', 'v2ray'）
 * @returns {string} 完整的转换 API URL
 */
export function buildConvertApiUrl(rawUrl, baseApi, target) {
    const params = new URLSearchParams({
        target,
        url: rawUrl,
        emoji: 'true',
        list: 'true',
        new_name: 'true',
    });
    return `${baseApi}/sub?${params}`;
}

// ─── 私有辅助函数 ────────────────────────────────────────────────────────────

/**
 * 依次尝试 YAML 解析和 JSON 解析，均失败时返回原始文本。
 * @param {string} text - 响应体文本
 * @returns {any} 解析结果
 */
function parseResponseBody(text) {
    try {
        return YAML.parse(text, { maxAliasCount: -1, merge: true });
    } catch {
        // YAML 解析失败，尝试 JSON
    }
    try {
        return JSON.parse(text);
    } catch {
        // JSON 解析也失败，返回原始文本
    }
    return text;
}

/**
 * 清理 Content-Disposition 头中的非 ASCII 文件名，
 * 将其替换为符合 RFC 5987 规范的 UTF-8 编码形式。
 *
 * @param {Headers} headers - 响应 Headers 对象
 * @returns {string|null} 清理后的头值，若无需处理则返回 null
 */
function sanitizeContentDisposition(headers) {
    const contentDisposition =
        headers.get('Content-Disposition') || headers.get('content-disposition');

    if (!contentDisposition) return null;

    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    if (!filenameMatch) return null;

    const originalFilename = filenameMatch[1];
    const hasNonAscii = /[^\x00-\x7F]/.test(originalFilename);
    if (!hasNonAscii) return contentDisposition;

    const encoded = encodeURIComponent(originalFilename);
    return `attachment; filename="download.json"; filename*=UTF-8''${encoded}`;
}
