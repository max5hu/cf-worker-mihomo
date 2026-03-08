/**
 * vercel.js
 *
 * Vercel Serverless Function 入口文件。
 * 接收 Node.js HTTP IncomingMessage 和 ServerResponse 对象，
 * 调用核心处理器并将结果写入响应流。
 *
 * 部署说明：
 *   - 将此文件放置在 Vercel 项目的 /api 目录下，或在 vercel.json 中配置路由
 *   - 可在 Vercel 的环境变量面板中配置以下 Key（与 worker.js 保持一致）：
 *       IMG / SUB / MIHOMOTOP / SINGBOX_1_11 / SINGBOX_1_12
 *       SINGBOX_1_12_ALPHA / SINGBOX_1_13 / BEIAN / BEIANURL
 *       MIHOMO / SINGBOX
 */

import { handleRequest } from './core/handler.js';

/**
 * Vercel Serverless Function 处理器。
 *
 * @param {import('http').IncomingMessage} req - Node.js HTTP 请求对象
 * @param {import('http').ServerResponse}  res - Node.js HTTP 响应对象
 */
export default async function handler(req, res) {
    // Vercel 传入的 req.url 是相对路径，需要拼接 Host 构造完整 URL
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const userAgent  = req.headers['user-agent'] || '';

    // 将 process.env 作为环境变量对象传入（与 CF Workers 的 env 对象保持接口一致）
    const env = process.env;

    try {
        const result = await handleRequest(requestUrl, userAgent, env);

        // 将过滤后的响应头写入 Node.js 响应
        for (const [key, value] of Object.entries(result.headers)) {
            res.setHeader(key, value);
        }

        if (result.isHtml) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }

        res.statusCode = result.status;
        res.end(result.body);
    } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: err.message }));
    }
}
