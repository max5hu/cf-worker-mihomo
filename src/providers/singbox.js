/**
 * providers/singbox.js
 *
 * Singbox 配置文件生成模块。
 * 负责版本检测、模板选择、节点获取、策略组处理及配置合并。
 */

import { fetchTemplate, fetchRule, fetchAndroidPackageList, fetchCnIpCidrList } from './rules.js';
import { fetchSingboxOutbounds } from './singbox-outbounds.js';
import { splitSubscriptionsAndProxies } from '../utils/parser.js';

/** 支持 Singbox 的 User-Agent 正则 */
const SINGBOX_UA_PATTERN = /singbox|sing-box|sfa/i;

/** 需要从 outbounds 中排除的内置类型（非真实节点） */
const EXCLUDED_OUTBOUND_TYPES = new Set(['direct', 'block', 'dns', 'selector', 'urltest']);

/**
 * 生成完整的 Singbox 配置。
 *
 * @param {Object} ctx - 请求上下文（由 core/handler.js 构建）
 * @returns {Promise<{status: number, headers: Object, data: string}>} 配置响应对象
 * @throws {Error} 若 User-Agent 不支持、版本不匹配或节点为空
 */
export async function generateSingboxConfig(ctx) {
    const topTemplateUrl = resolveTopTemplateUrl(ctx);
    ctx.urls = splitSubscriptionsAndProxies(ctx.urls);

    const [templateData, ruleData, outboundsData, excludePackages, excludeAddresses] =
        await Promise.all([
            fetchTemplate(topTemplateUrl),
            fetchRule(ctx.template),
            fetchSingboxOutbounds(ctx),
            ctx.excludePackage ? fetchAndroidPackageList() : null,
            ctx.excludeAddress ? fetchCnIpCidrList() : null,
        ]);

    ctx.resolvedExcludePackages = excludePackages;
    ctx.resolvedExcludeAddresses = excludeAddresses;

    if (!outboundsData?.data?.outbounds?.length) {
        throw new Error('节点为空，请使用有效的订阅链接');
    }

    // 过滤出真实节点（排除内置类型）
    const realOutbounds = filterRealOutbounds(outboundsData.data);
    const outboundTags = realOutbounds.map((o) => o.tag);

    // 处理策略组（根据节点 tag 填充 outbounds 字段）
    ruleData.data.outbounds = processOutboundGroups(ruleData.data.outbounds, outboundTags);

    // 将真实节点追加到策略组之后
    ruleData.data.outbounds.push(...realOutbounds);

    // 将规则模板应用到顶层配置
    applyRuleToTemplate(templateData.data, ruleData.data, ctx);

    return {
        status: outboundsData.status,
        headers: outboundsData.headers,
        data: JSON.stringify(templateData.data, null, 4),
    };
}

// ─── 私有辅助函数 ────────────────────────────────────────────────────────────

/**
 * 根据 User-Agent 中的版本号选择对应的顶层配置模板 URL。
 *
 * @param {Object} ctx - 请求上下文
 * @returns {string} 顶层配置模板 URL
 * @throws {Error} 若 UA 不支持或版本无法匹配
 */
function resolveTopTemplateUrl(ctx) {
    if (!SINGBOX_UA_PATTERN.test(ctx.userAgent)) {
        throw new Error('不支持的客户端，请使用 Singbox / Sing-Box 客户端访问');
    }

    const ua = ctx.userAgent;
    const v112alphaMatch = ua.match(/1\.12\.0-alpha\.(\d{1,2})\b/);
    const v112betaMatch  = ua.match(/1\.12\.0-beta\.(\d{1,2})\b/);
    const v111Match      = ua.match(/1\.11\.(\d+)/);
    const v112Match      = ua.match(/1\.12\.(\d+)/);
    const v113Match      = ua.match(/1\.13\.(\d+)/);

    if (v112alphaMatch) {
        const num = parseInt(v112alphaMatch[1], 10);
        if (num >= 0 && num <= 23) return ctx.singbox_1_12_alpha;
    }

    if (v112betaMatch) {
        const num = parseInt(v112betaMatch[1], 10);
        if (num >= 0 && num <= 9) {
            ctx.enableTailscale = false;
            ctx.enableTlsFrag   = false;
            return ctx.singbox_1_11;
        }
    }

    if (v111Match) {
        ctx.enableTailscale = false;
        ctx.enableTlsFrag   = false;
        return ctx.singbox_1_11;
    }

    if (v112Match) return ctx.singbox_1_12;
    if (v113Match) return ctx.singbox_1_13;

    throw new Error(`不支持的 Singbox 版本：${ua}`);
}

/**
 * 从 outbounds 数据中过滤出真实节点（排除内置类型及无效节点）。
 *
 * @param {Object} data - 包含 outbounds 数组的数据对象
 * @returns {Object[]} 真实节点数组
 */
function filterRealOutbounds(data) {
    if (!Array.isArray(data.outbounds)) return [];

    return data.outbounds.filter((outbound) => {
        if (EXCLUDED_OUTBOUND_TYPES.has(outbound.type)) return false;
        if (outbound?.server === '')       return false;
        if (outbound?.server_port < 1)    return false;
        if (outbound?.password === '')     return false;
        return true;
    });
}

/**
 * 处理策略组：根据过滤器规则将真实节点 tag 填充到各策略组的 outbounds 字段中，
 * 并清理空的策略组及其引用。
 *
 * @param {Object[]} groups - 策略组数组（会被原地修改）
 * @param {string[]} allTags - 所有真实节点的 tag 列表
 * @returns {Object[]} 处理后的策略组数组
 */
function processOutboundGroups(groups, allTags) {
    const processed = groups.map((group) => {
        const { matchedTags, hasFilter } = resolveGroupTags(group, allTags);
        return applyTagsToGroup(group, matchedTags, hasFilter);
    });

    return removeEmptyGroups(processed);
}

/**
 * 根据策略组的 filter 字段解析出匹配的节点 tag 列表。
 */
function resolveGroupTags(group, allTags) {
    if (!Array.isArray(group.filter)) {
        return { matchedTags: [], hasFilter: false };
    }

    let matchedTags = [];
    let hasFilter = false;

    for (const filter of group.filter) {
        if (filter.action === 'all') {
            matchedTags = [...matchedTags, ...allTags];
            hasFilter = true;
            continue;
        }

        if (!filter.keywords || typeof filter.keywords !== 'string') continue;

        const ignoreCase = /\(\?i\)/i.test(filter.keywords);
        const pattern = filter.keywords.replace(/\(\?i\)/gi, '');
        const regex = new RegExp(pattern, ignoreCase ? 'i' : '');

        const matched = applyFilterAction(allTags, regex, filter.action);
        matchedTags = [...matchedTags, ...matched];
        hasFilter = true;
    }

    return { matchedTags: [...new Set(matchedTags)], hasFilter };
}

/**
 * 根据 action 类型对 tag 列表进行过滤。
 */
function applyFilterAction(tags, regex, action) {
    switch (action) {
        case 'include': return tags.filter((t) => regex.test(t));
        case 'exclude': return tags.filter((t) => !regex.test(t));
        default:        return [];
    }
}

/**
 * 将匹配的 tag 列表应用到策略组，并删除 filter 字段。
 */
function applyTagsToGroup(group, matchedTags, hasFilter) {
    if (matchedTags.length > 0) {
        group.outbounds = group.outbounds
            ? [...new Set([...group.outbounds, ...matchedTags])]
            : matchedTags;
    }
    delete group.filter;
    return group;
}

/**
 * 移除 outbounds 为空的策略组，并从其他组的 outbounds 引用中删除这些空组的 tag。
 */
function removeEmptyGroups(groups) {
    const emptyTags = groups
        .filter((g) => !g.outbounds || (Array.isArray(g.outbounds) && g.outbounds.length === 0))
        .map((g) => g.tag)
        .filter(Boolean);

    const cleaned = groups.map((g) => {
        if (Array.isArray(g.outbounds)) {
            g.outbounds = g.outbounds.filter((tag) => !emptyTags.includes(tag));
        }
        return g;
    });

    return cleaned.filter(
        (g) => Array.isArray(g.outbounds) && g.outbounds.length > 0
    );
}

/**
 * 将规则模板内容合并到顶层配置，并根据上下文参数进行调整。
 *
 * @param {Object} top - 顶层配置对象（会被原地修改）
 * @param {Object} rule - 规则模板对象
 * @param {Object} ctx - 请求上下文
 */
function applyRuleToTemplate(top, rule, ctx) {
    // 合并 rule_set（以 tag 去重）
    const ruleSetMap = new Map();
    for (const item of (Array.isArray(top.route?.rule_set) ? top.route.rule_set : [])) {
        if (item?.tag) ruleSetMap.set(item.tag, item);
    }
    for (const item of (Array.isArray(rule.route?.rule_set) ? rule.route.rule_set : [])) {
        if (item?.tag) ruleSetMap.set(item.tag, item);
    }

    top.inbounds  = rule?.inbounds || top.inbounds;
    top.outbounds = [
        ...(Array.isArray(top.outbounds)  ? top.outbounds  : []),
        ...(Array.isArray(rule?.outbounds) ? rule.outbounds : []),
    ];
    top.route.final    = rule?.route?.final || top.route.final;
    top.route.rules    = [
        ...(Array.isArray(top.route.rules)   ? top.route.rules   : []),
        ...(Array.isArray(rule?.route?.rules) ? rule.route.rules  : []),
    ];
    top.route.rule_set = Array.from(ruleSetMap.values());

    // tun 入站处理
    if (ctx.enableTun) {
        top.inbounds = top.inbounds.filter((p) => p.type !== 'tun');
    } else {
        if (ctx.excludePackage && ctx.resolvedExcludePackages) {
            addExcludePackage(top, ctx.resolvedExcludePackages);
        }
        if (ctx.excludeAddress && ctx.resolvedExcludeAddresses) {
            addExcludeAddress(top, ctx.resolvedExcludeAddresses);
        }
    }

    // Tailscale 端点配置
    if (ctx.enableTailscale) {
        top.dns.servers.push({
            type: 'tailscale',
            endpoint: 'ts-ep',
            accept_default_resolvers: true,
        });
        top.endpoints = top.endpoints || [];
        top.endpoints.push({
            type: 'tailscale',
            tag: 'ts-ep',
            auth_key: '',
            hostname: 'singbox-tailscale',
            udp_timeout: '5m',
        });
    }

    // ref1nd 客户端特殊处理
    if (/ref1nd/i.test(ctx.userAgent)) {
        for (const item of top.route.rules) {
            if (item.action === 'resolve') {
                item.match_only = true;
            }
        }
    }

    // route-options 规则处理（UDP / TLS 分段）
    top.route.rules = top.route.rules.flatMap((rule) => {
        if (rule.action !== 'route-options') return rule;
        if (!ctx.enableUdp && !ctx.enableTlsFrag) return [];

        if (ctx.enableUdp) {
            rule.udp_disable_domain_unmapping = true;
            rule.udp_connect = true;
            rule.udp_timeout = '5m';
        }
        if (ctx.enableTlsFrag) {
            rule.tls_fragment = true;
            rule.tls_fragment_fallback_delay = '5m';
        }
        return rule;
    });

    // AdGuard DNS 配置
    if (ctx.enableAdgDns) {
        top.dns.servers = top.dns.servers.map((server) => {
            if (server.tag === 'DIRECT-DNS') {
                return {
                    type: 'quic',
                    tag: 'DIRECT-DNS',
                    detour: '🎯 全球直连',
                    server_port: 853,
                    server: 'dns.18bit.cn',
                    domain_resolver: 'local',
                };
            }
            if (server.tag === 'PROXY-DNS') {
                return {
                    type: 'https',
                    tag: 'PROXY-DNS',
                    detour: '🚀 节点选择',
                    server_port: 443,
                    server: 'dns.adguard-dns.com',
                    domain_resolver: 'local',
                };
            }
            return server;
        });
    }
}

/**
 * 向 tun 入站添加排除应用包名配置。
 */
function addExcludePackage(top, packages) {
    for (const inbound of top.inbounds) {
        if (inbound.type !== 'tun') continue;
        if (!Array.isArray(inbound.exclude_package)) {
            inbound.exclude_package = [];
        }
        inbound.exclude_package = [...new Set([...inbound.exclude_package, ...packages])];
    }
}

/**
 * 向 tun 入站添加排除 IP 地址段配置。
 */
function addExcludeAddress(top, addresses) {
    for (const inbound of top.inbounds) {
        if (inbound.type !== 'tun') continue;
        inbound.route_address = ['0.0.0.0/1', '128.0.0.0/1', '::/1', '8000::/1'];
        if (!Array.isArray(inbound.route_exclude_address)) {
            inbound.route_exclude_address = [];
        }
        inbound.route_exclude_address = [
            ...new Set([...inbound.route_exclude_address, ...addresses]),
        ];
    }
}
