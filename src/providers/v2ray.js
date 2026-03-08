/**
 * providers/v2ray.js
 *
 * V2Ray 配置获取模块。
 * 通过订阅转换后端将订阅链接转换为 V2Ray 格式并返回。
 */

import { fetchRemote, buildConvertApiUrl } from '../utils/http.js';

/**
 * 获取 V2Ray 格式的订阅配置。
 * 将所有订阅链接合并后通过转换后端转换为 V2Ray 格式。
 *
 * @param {Object} ctx - 请求上下文
 * @param {string[]} ctx.urls - 订阅链接列表
 * @param {string} ctx.subApi - 订阅转换后端地址
 * @param {string} ctx.userAgent - 请求 User-Agent
 * @returns {Promise<{status: number, headers: Object, data: any}>} 配置响应对象
 * @throws {Error} 若获取订阅数据失败
 */
export async function generateV2rayConfig(ctx) {
    const convertUrl = buildConvertApiUrl(ctx.urls.join(','), ctx.subApi, 'v2ray');
    const res = await fetchRemote(convertUrl, ctx.userAgent);

    if (res.data === undefined || res.data === null || res.data === '') {
        throw new Error('获取订阅数据失败，请检查订阅链接是否有效');
    }

    return {
        status: res.status,
        headers: res.headers,
        data: res.data,
    };
}
