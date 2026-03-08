/**
 * providers/singbox-outbounds.js
 *
 * Singbox outbounds 节点数据获取与处理模块。
 * 负责从订阅链接中提取 outbounds 列表，支持单链接和多链接合并，
 * 并在直接请求失败时自动回退到订阅转换后端。
 */

import { fetchRemote, buildConvertApiUrl } from '../utils/http.js';

/**
 * 获取并合并所有订阅链接中的 Singbox outbounds 数据。
 *
 * @param {Object} ctx - 请求上下文
 * @param {string[]} ctx.urls - 订阅链接列表
 * @param {string} ctx.userAgent - 请求 User-Agent
 * @param {string} ctx.subApi - 订阅转换后端地址
 * @param {boolean} ctx.enableUdpFrag - 是否为节点启用 UDP 分段
 * @returns {Promise<{status: number, headers: Object, data: {outbounds: any[]}}|null>}
 *   合并后的节点数据，若所有链接均无有效节点则返回 null
 */
export async function fetchSingboxOutbounds(ctx) {
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

    if (hasValidOutbounds(res)) {
        applyOutboundOptions(res.data.outbounds, ctx.enableUdpFrag, 0);
        return {
            status: res.status,
            headers: res.headers,
            data: res.data,
        };
    }

    return null;
}

/**
 * 处理多个订阅链接并合并节点。
 */
async function fetchAndMergeSubscriptions(ctx) {
    const allOutbounds = [];
    const validResponses = [];

    for (let i = 0; i < ctx.urls.length; i++) {
        const res = await fetchWithFallback(ctx.urls[i], ctx);
        if (!hasValidOutbounds(res)) continue;

        applyOutboundOptions(res.data.outbounds, ctx.enableUdpFrag, i + 1);
        allOutbounds.push(...res.data.outbounds);
        validResponses.push(res);
    }

    if (validResponses.length === 0) {
        throw new Error('所有订阅链接均未返回有效的 outbounds 节点');
    }

    const representative = validResponses[Math.floor(Math.random() * validResponses.length)];

    return {
        status: representative.status,
        headers: representative.headers,
        data: { outbounds: allOutbounds },
    };
}

/**
 * 带回退机制的请求：先直接请求，若无有效 outbounds 则通过转换后端重试。
 */
async function fetchWithFallback(url, ctx) {
    const directRes = await fetchRemote(url, ctx.userAgent);
    if (hasValidOutbounds(directRes)) return directRes;

    const convertUrl = buildConvertApiUrl(url, ctx.subApi, 'singbox');
    return fetchRemote(convertUrl, ctx.userAgent);
}

/**
 * 检查响应是否包含有效的 outbounds 数组。
 */
function hasValidOutbounds(res) {
    return Array.isArray(res?.data?.outbounds) && res.data.outbounds.length > 0;
}

/**
 * 对 outbounds 列表应用选项（UDP 分段、序号后缀）。
 *
 * @param {Object[]} outbounds - outbounds 列表（会被原地修改）
 * @param {boolean} enableUdpFrag - 是否启用 UDP 分段
 * @param {number} index - 多订阅时的序号（0 表示单订阅，不添加后缀）
 */
function applyOutboundOptions(outbounds, enableUdpFrag, index) {
    for (const outbound of outbounds) {
        if (index > 0) {
            outbound.tag = `${outbound.tag} [${index}]`;
        }
        if (enableUdpFrag) {
            outbound.udp_fragment = true;
        }
    }
}
