/**
 * providers/mihomo.js
 *
 * Mihomo (Clash Meta) 配置文件生成模块。
 * 负责协调模板获取、节点获取、规则合并，最终输出完整的 Mihomo 配置 JSON 字符串。
 */

import { fetchTemplate, fetchRule, fetchAndroidPackageList, fetchCnIpCidrList } from './rules.js';
import { fetchMihomoProxies } from './mihomo-proxies.js';
import { splitSubscriptionsAndProxies } from '../utils/parser.js';

/** 支持 Mihomo 的 User-Agent 正则 */
const MIHOMO_UA_PATTERN = /meta|clash\.meta|clash|clashverge|mihomo/i;

/**
 * 生成完整的 Mihomo 配置。
 *
 * @param {Object} ctx - 请求上下文（由 core/handler.js 构建）
 * @returns {Promise<{status: number, headers: Object, data: string}>} 配置响应对象
 * @throws {Error} 若 User-Agent 不支持、节点为空或规则模板获取失败
 */
export async function generateMihomoConfig(ctx) {
    if (!MIHOMO_UA_PATTERN.test(ctx.userAgent)) {
        throw new Error('不支持的客户端，请使用 Mihomo / Clash Meta 客户端访问');
    }

    ctx.urls = splitSubscriptionsAndProxies(ctx.urls);

    const [templateData, ruleData, proxiesData, excludePackages, excludeAddresses] =
        await Promise.all([
            fetchTemplate(ctx.mihomoTop),
            fetchRule(ctx.template),
            fetchMihomoProxies(ctx),
            ctx.excludePackage ? fetchAndroidPackageList() : null,
            ctx.excludeAddress ? fetchCnIpCidrList() : null,
        ]);

    ctx.resolvedExcludePackages = excludePackages;
    ctx.resolvedExcludeAddresses = excludeAddresses;

    if (!proxiesData?.data?.proxies?.length) {
        throw new Error('节点为空，请检查订阅链接是否有效');
    }

    // 将节点合并到规则模板
    ruleData.data.proxies = [
        ...(ruleData.data.proxies || []),
        ...proxiesData.data.proxies,
    ];
    ruleData.data['proxy-groups'] = buildProxyGroups(proxiesData.data, ruleData.data);
    ruleData.data['proxy-providers'] = proxiesData.data.providers;

    // 将规则模板内容应用到顶层配置
    applyRuleToTemplate(templateData.data, ruleData.data, ctx);

    return {
        status: proxiesData.status,
        headers: proxiesData.headers,
        data: JSON.stringify(templateData.data, null, 4),
    };
}

// ─── 私有辅助函数 ────────────────────────────────────────────────────────────

/**
 * 将规则模板中的 proxies、proxy-groups、rules 等字段合并到顶层配置，
 * 并根据上下文参数（tun、adgdns、excludePackage 等）调整配置。
 *
 * @param {Object} top - 顶层配置对象（会被原地修改）
 * @param {Object} rule - 规则模板对象
 * @param {Object} ctx - 请求上下文
 */
function applyRuleToTemplate(top, rule, ctx) {
    top['proxy-providers'] = rule['proxy-providers'] || {};
    top.proxies            = rule.proxies || [];
    top['proxy-groups']    = rule['proxy-groups'] || [];
    top.rules              = rule.rules || {};
    top['sub-rules']       = rule['sub-rules'] || {};
    top['rule-providers']  = {
        ...(top['rule-providers'] || {}),
        ...(rule['rule-providers'] || {}),
    };

    if (top.tun) {
        if (ctx.enableTun) {
            top.tun.enable = false;
        } else {
            if (ctx.excludeAddress && ctx.resolvedExcludeAddresses) {
                top.tun['route-address']         = ['0.0.0.0/1', '128.0.0.0/1', '::/1', '8000::/1'];
                top.tun['route-exclude-address'] = ctx.resolvedExcludeAddresses;
            }
            if (ctx.excludePackage && ctx.resolvedExcludePackages) {
                top.tun['include-package'] = [];
                top.tun['exclude-package'] = ctx.resolvedExcludePackages;
            }
        }
    }

    if (ctx.enableAdgDns && top.dns) {
        top.dns.nameserver = ['https://dns.adguard-dns.com/dns-query'];
        top.dns['nameserver-policy']['RULE-SET:private_domain,cn_domain'] = [
            'quic://dns.18bit.cn',
        ];
    }
}

/**
 * 根据实际节点列表，过滤掉无匹配节点的策略组，并清理引用了被删除策略组的条目。
 *
 * @param {Object} proxiesData - 节点数据（含 proxies 数组）
 * @param {Object} ruleData - 规则模板数据（含 proxy-groups 数组）
 * @returns {Object[]} 处理后的策略组数组
 */
function buildProxyGroups(proxiesData, ruleData) {
    const deletedGroupNames = [];

    const filteredGroups = ruleData['proxy-groups'].filter((group) => {
        if (typeof group.filter !== 'string') return true;

        const hasIgnoreCase = /\(\?i\)/i.test(group.filter);
        const cleanedFilter = group.filter.replace(/\(\?i\)/gi, '');

        let regex;
        try {
            regex = new RegExp(cleanedFilter, hasIgnoreCase ? 'i' : '');
        } catch {
            console.warn(`[buildProxyGroups] 无效的正则表达式: ${group.filter}`);
            return true;
        }

        const hasMatch = proxiesData.proxies.some((proxy) => regex.test(proxy.name));

        if (!hasMatch && (!group.proxies || group.proxies.length === 0)) {
            deletedGroupNames.push(group.name);
            return false;
        }

        return true;
    });

    // 从所有策略组的 proxies 列表中移除已删除的组名
    for (const group of filteredGroups) {
        if (Array.isArray(group.proxies)) {
            group.proxies = group.proxies.filter(
                (name) => !deletedGroupNames.some((deleted) => deleted.includes(name))
            );
        }
    }

    return filteredGroups;
}
