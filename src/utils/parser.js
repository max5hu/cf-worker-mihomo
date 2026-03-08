/**
 * utils/parser.js
 *
 * 数据解析与处理工具函数。
 * 包含订阅链接分类、URL 参数解析等纯函数逻辑。
 */

/**
 * 将混合的 URL 列表分离为"订阅链接"和"代理节点字符串"两类。
 * 以 http:// 或 https:// 开头的被视为订阅链接，其余的被视为代理节点，
 * 多个代理节点会用 `|` 拼接后作为一个整体追加到结果数组末尾。
 *
 * @param {string[]} urls - 混合的 URL 列表
 * @returns {string[]} 分离后的数组（订阅链接在前，代理节点字符串在末尾）
 */
export function splitSubscriptionsAndProxies(urls) {
    const subscriptions = [];
    const proxyParts = [];

    for (const url of urls) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            subscriptions.push(url);
        } else {
            proxyParts.push(url);
        }
    }

    if (proxyParts.length > 0) {
        subscriptions.push(proxyParts.join('|'));
    }

    return subscriptions;
}

/**
 * 从请求 URL 的查询参数中解析所有业务参数，
 * 并将逗号分隔的单个 url 参数展开为数组。
 *
 * @param {URL} url - 已解析的 URL 对象
 * @returns {Object} 解析后的参数对象
 */
export function parseQueryParams(url) {
    const sp = url.searchParams;

    let urls = sp.getAll('url');
    if (urls.length === 1 && urls[0].includes(',')) {
        urls = urls[0].split(',').map((u) => u.trim()).filter(Boolean);
    }

    return {
        urls,
        template      : sp.get('template'),
        isSingbox     : sp.get('singbox')   === 'true',
        isMihomo      : sp.get('mihomo')    === 'true',
        isV2ray       : sp.get('v2ray')     === 'true',
        enableUdp     : sp.get('udp')       === 'true',
        enableUdpFrag : sp.get('udp_frag')  === 'true',
        enableTlsFrag : sp.get('tls_frag')  === 'true',
        excludePackage: sp.get('ep')        === 'true',
        excludeAddress: sp.get('ea')        === 'true',
        enableTailscale: sp.get('tailscale') === 'true',
        enableTun     : sp.get('tun')       === 'true',
        enableAdgDns  : sp.get('adgdns')    === 'true',
    };
}
