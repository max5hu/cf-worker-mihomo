/**
 * providers/rules.js
 *
 * 规则数据获取模块。
 * 负责从远程获取顶层配置模板、规则模板、Android 应用包名列表及 CN IP CIDR 列表。
 */

import YAML from 'yaml';
import { fetchRemote } from '../utils/http.js';

/**
 * 获取顶层配置模板（如 Mihomo_lite.yaml 或 singbox_1.13.X.json）。
 *
 * @param {string} templateUrl - 模板文件的远程地址
 * @returns {Promise<{status: number, headers: Object, data: any}>} 模板数据
 */
export async function fetchTemplate(templateUrl) {
    return fetchRemote(templateUrl);
}

/**
 * 获取规则模板（用户通过 `template` 参数指定的配置文件）。
 *
 * @param {string} ruleUrl - 规则文件的远程地址
 * @returns {Promise<{status: number, headers: Object, data: any}>} 规则数据
 * @throws {Error} 若 ruleUrl 为空则抛出错误
 */
export async function fetchRule(ruleUrl) {
    if (!ruleUrl) {
        throw new Error('缺少规则模板，请通过 template 参数指定配置文件地址');
    }
    return fetchRemote(ruleUrl);
}

/**
 * 获取 Android 应用包名列表（用于分应用代理的排除配置）。
 * 从多个规则集中提取 PROCESS-NAME 条目，并过滤掉浏览器类应用。
 *
 * @returns {Promise<string[]>} 应用包名数组
 */
export async function fetchAndroidPackageList() {
    const sourceUrls = [
        'https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/GAME.mutated.yaml',
        'https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/APP.mutated.yaml',
    ];
    const excludeCommentKeywords = ['浏览器'];
    const excludePackages = new Set(['com.android.chrome']);
    const packageNames = new Set();

    const defaultUserAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

    for (const url of sourceUrls) {
        let res;
        try {
            res = await fetch(url, { headers: { 'user-agent': defaultUserAgent } });
        } catch {
            console.error(`[fetchAndroidPackageList] 请求失败: ${url}`);
            continue;
        }
        if (!res.ok) {
            console.error(`[fetchAndroidPackageList] 非 2xx 响应: ${url} - ${res.status}`);
            continue;
        }

        const text = await res.text();
        for (const line of text.split('\n')) {
            const match = line.match(/PROCESS-NAME\s*,\s*([^\s,]+)/);
            if (!match) continue;
            const name = match[1];
            const hasExcludedKeyword = excludeCommentKeywords.some((kw) => line.includes(kw));
            if (!hasExcludedKeyword && !excludePackages.has(name)) {
                packageNames.add(name);
            }
        }
    }

    return [...packageNames];
}

/**
 * 获取 CN IP CIDR 列表（用于分 IP 代理的排除配置）。
 *
 * @returns {Promise<string[]>} CIDR 字符串数组
 */
export async function fetchCnIpCidrList() {
    const sourceUrls = [
        'https://raw.githubusercontent.com/Kwisma/clash-rules/release/cncidr.yaml',
    ];
    const cidrList = [];
    const defaultUserAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

    for (const url of sourceUrls) {
        let res;
        try {
            res = await fetch(url, { headers: { 'user-agent': defaultUserAgent } });
        } catch {
            console.error(`[fetchCnIpCidrList] 请求失败: ${url}`);
            continue;
        }
        if (!res.ok) {
            console.error(`[fetchCnIpCidrList] 非 2xx 响应: ${url} - ${res.status}`);
            continue;
        }

        const text = await res.text();
        const parsed = YAML.parse(text, { maxAliasCount: -1, merge: true });
        if (Array.isArray(parsed?.payload)) {
            cidrList.push(...parsed.payload);
        }
    }

    return cidrList;
}
