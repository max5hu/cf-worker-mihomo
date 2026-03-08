/**
 * worker.js
 *
 * Cloudflare Workers 入口文件。
 * 接收 Workers 运行时传入的 Request 和 env 对象，
 * 调用核心处理器并将结果转换为标准 Response 返回。
 *
 * 部署说明：
 *   - 将此文件作为 Cloudflare Workers 的入口（main）
 *   - 可在 Workers 的环境变量中配置以下 Key：
 *       IMG            背景图片地址
 *       SUB            订阅转换后端地址
 *       MIHOMOTOP      Mihomo 顶层配置模板地址
 *       SINGBOX_1_11   Singbox 1.11.x 顶层配置模板地址
 *       SINGBOX_1_12   Singbox 1.12.x 顶层配置模板地址
 *       SINGBOX_1_12_ALPHA  Singbox 1.12.x alpha 顶层配置模板地址
 *       SINGBOX_1_13   Singbox 1.13.x 顶层配置模板地址
 *       BEIAN          备案文字
 *       BEIANURL       备案链接
 *       MIHOMO         自定义 Mihomo 规则模板地址
 *       SINGBOX        自定义 Singbox 规则模板地址
 */

import { handleRequest } from './core/handler.js';

export default {
    /**
     * @param {Request} request - Cloudflare Workers Request 对象
     * @param {Object}  env     - Workers 环境变量绑定对象
     * @returns {Promise<Response>}
     */
    async fetch(request, env) {
        const requestUrl = new URL(request.url);
        const userAgent  = request.headers.get('User-Agent') || '';

        try {
            const result = await handleRequest(requestUrl, userAgent, env);

            const headers = new Headers(result.headers);
            if (result.isHtml) {
                headers.set('Content-Type', 'text/html; charset=utf-8');
            }

            return new Response(result.body, {
                status: result.status,
                headers,
            });
        } catch (err) {
            return new Response(
                JSON.stringify({ error: err.message }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                }
            );
        }
    },
};
