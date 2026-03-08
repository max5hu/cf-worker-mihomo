/**
 * config/constants.js
 *
 * 全局常量与默认配置。
 * 所有 Base64 编码的默认值在此处统一解码，避免在业务代码中散落编解码调用。
 */

import { base64Decode } from '../utils/codec.js';

/** 默认背景图片地址 */
export const DEFAULT_BACKGROUND_IMAGE = base64Decode('aHR0cHM6Ly90LmFsY3kuY2MveWN5');

/** 默认订阅转换后端地址 */
export const DEFAULT_SUB_API = base64Decode('aHR0cHM6Ly9zdWItc3RvcnQtbm9kZWpzLnBhZ2VzLmRldg==');

/** Mihomo 默认顶层配置模板地址 */
export const DEFAULT_MIHOMO_TOP = base64Decode(
    'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL21haW4vQ29uZmlnL01paG9tb19saXRlLnlhbWw='
);

/** Singbox 各版本默认顶层配置模板地址 */
export const DEFAULT_SINGBOX_1_11 = base64Decode(
    'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveF8xLjExLlguanNvbg=='
);
export const DEFAULT_SINGBOX_1_12 = base64Decode(
    'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEyLlguanNvbg=='
);
export const DEFAULT_SINGBOX_1_12_ALPHA = base64Decode(
    'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEyLlguYWxwaGEuanNvbg=='
);
export const DEFAULT_SINGBOX_1_13 = base64Decode(
    'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEzLlguanNvbg=='
);

/** 备案信息默认值 */
export const DEFAULT_BEIAN_TEXT = base64Decode('6JCMSUNQ5aSHMjAyNTAwMDHlj7c=');
export const DEFAULT_BEIAN_URL  = base64Decode('aHR0cHM6Ly90Lm1lL01hcmlzYV9rcmlzdGk=');

/**
 * 从环境变量或默认值中构建运行时配置对象。
 * 兼容 Cloudflare Workers (env 对象) 和 Vercel (process.env)。
 *
 * @param {Object} env - 环境变量对象（CF Workers 传入 env，Vercel 传入 process.env）
 * @returns {Object} 运行时配置
 */
export function buildRuntimeConfig(env = {}) {
    return {
        backgroundImage : env.IMG            || DEFAULT_BACKGROUND_IMAGE,
        subApi          : env.SUB            || DEFAULT_SUB_API,
        mihomoTop       : env.MIHOMOTOP      || DEFAULT_MIHOMO_TOP,
        singbox_1_11    : env.SINGBOX_1_11   || DEFAULT_SINGBOX_1_11,
        singbox_1_12    : env.SINGBOX_1_12   || DEFAULT_SINGBOX_1_12,
        singbox_1_12_alpha: env.SINGBOX_1_12_ALPHA || DEFAULT_SINGBOX_1_12_ALPHA,
        singbox_1_13    : env.SINGBOX_1_13   || DEFAULT_SINGBOX_1_13,
        beianText       : env.BEIAN          || DEFAULT_BEIAN_TEXT,
        beianUrl        : env.BEIANURL       || DEFAULT_BEIAN_URL,
        customMihomoTemplate : env.MIHOMO    || '',
        customSingboxTemplate: env.SINGBOX   || '',
    };
}
