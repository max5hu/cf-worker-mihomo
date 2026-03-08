/**
 * providers/mihomo-proxies.js
 *
 * Mihomo 节点数据获取与处理模块。
 * 负责从订阅链接中提取 proxies 列表，支持单链接和多链接合并，
 * 并在直接请求失败时自动回退到订阅转换后端。
 */

import { fetchRemote, buildConvertApiUrl } from '../utils/http.js';

/**
 * 获取并合并所有订阅链接中的 Mihomo proxies 数据。
 *
 * @param {Object} ctx - 请求上下文
 * @param {string[]} ctx.urls - 订阅链接列表
 * @param {string} ctx.userAgent - 请求 User-Agent
 * @param {string} ctx.subApi - 订阅转换后端地址
 * @param {boolean} ctx.enableUdp - 是否为所有节点启用 UDP
 * @returns {Promise<{status: number, headers: Object, data: {proxies: any[], providers: Object}}|null>}
 *   合并后的节点数据，若所有链接均无有效节点则返回 null
 */
export async function fetchMihomoProxies(ctx) {
    if (ctx.urls.length === 1) {
        return fetchSingleSubscription(ctx.urls[0], ctx);
    }
    return fetchAndMergeSubscriptions(ctx);
}

// ─── 私有辅助函数 ────────────────────────────────────────────────────────────

/**
 * 处理单个订阅链接。
 */
async function fetchSingleSubscription(url, ctx) {
    const res = await fetchWithFallback(url, ctx);

    if (hasValidProxies(res)) {
        applyProxyOptions(res.data.proxies, ctx.enableUdp, null);
        return {
            status: res.status,
            headers: res.headers,
            data: { ...res.data, providers: {} },
        };
    }

    return null;
}

/**
 * 处理多个订阅链接并合并节点。
 */
async function fetchAndMergeSubscriptions(ctx) {
    const mergedProxies = [];
    const validResponses = [];

    for (let i = 0; i < ctx.urls.length; i++) {
        const res = await fetchWithFallback(ctx.urls[i], ctx);
        if (!hasValidProxies(res)) continue;

        applyProxyOptions(res.data.proxies, ctx.enableUdp, i + 1);
        mergedProxies.push(...res.data.proxies);
        validResponses.push({ status: res.status, headers: res.headers });
    }

    if (validResponses.length === 0) return null;

    // 随机选取一个响应的 status/headers 作为代表
    const representative = validResponses[Math.floor(Math.random() * validResponses.length)];

    return {
        status: representative.status,
        headers: representative.headers,
        data: { proxies: mergedProxies, providers: {} },
    };
}

/**
 * 带回退机制的请求：先直接请求，若无有效 proxies 则通过转换后端重试。
 */
async function fetchWithFallback(url, ctx) {
    const directRes = await fetchRemote(url, ctx.userAgent);
    if (hasValidProxies(directRes)) return directRes;

    const convertUrl = buildConvertApiUrl(url, ctx.subApi, 'clash.meta');
    return fetchRemote(convertUrl, ctx.userAgent);
}

/**
 * 检查响应是否包含有效的 proxies 数组。
 */
function hasValidProxies(res) {
    return Array.isArray(res?.data?.proxies) && res.data.proxies.length > 0;
}

/**
 * 对节点列表应用选项（UDP、序号后缀）。
 *
 * @param {Object[]} proxies - 节点列表（会被原地修改）
 * @param {boolean} enableUdp - 是否启用 UDP
 * @param {number|null} index - 多订阅时的序号，单订阅传 null
 */
function applyProxyOptions(proxies, enableUdp, index) {
    for (const proxy of proxies) {
        if (index !== null) {
            proxy.name = `${proxy.name} [${index}]`;
        }
        if (enableUdp) {
            proxy.udp = true;
        }
    }
}
