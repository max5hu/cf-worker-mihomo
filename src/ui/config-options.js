/**
 * ui/config-options.js
 *
 * 前端页面所需的配置选项数据生成函数。
 * 包含模板配置列表（configs）和模式定义（modes），
 * 最终以 JSON 字符串形式注入到 HTML 页面的 <script> 标签中。
 */

/**
 * 生成模板配置选项列表（JSON 字符串）。
 * 若提供了自定义模板地址，则将其插入到对应分类的首位。
 *
 * @param {string} [customMihomoTemplate=''] - 自定义 Mihomo 模板地址
 * @param {string} [customSingboxTemplate=''] - 自定义 Singbox 模板地址
 * @returns {string} JSON 字符串
 */
export function buildConfigOptions(customMihomoTemplate = '', customSingboxTemplate = '') {
    const data = {
        mihomo: [
            {
                label: '通用',
                options: [
                    {
                        label: '默认(精简版) (仅国内外分流) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default.yaml',
                    },
                    {
                        label: '默认(精简版) (仅国内外分流) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_NoAds.yaml',
                    },
                    {
                        label: '默认(mihomo官方版) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_official.yaml',
                    },
                    {
                        label: '默认(mihomo官方版) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_official_NoAds.yaml',
                    },
                    {
                        label: '默认(ACL4SSR_Online_Full) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: '默认(ACL4SSR_Online_Full) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_ACL4SSR_Online_Full_NoAds.yaml',
                    },
                    {
                        label: '默认(全分组) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full.yaml',
                    },
                    {
                        label: '默认(全分组) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full_NoAds.yaml',
                    },
                ],
            },
            {
                label: 'Lanlan13-14',
                options: [
                    {
                        label: 'configfull 全分组版 (秋风去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull.yaml',
                    },
                    {
                        label: 'configfull_NoAd 全分组版 (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd.yaml',
                    },
                    {
                        label: 'configfull_NoAd_lite 全分组版 (无去广告) (精简版) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd_lite.yaml',
                    },
                    {
                        label: 'configfull_lite 全分组版 (精简版) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_lite.yaml',
                    },
                ],
            },
            {
                label: 'zhuqq2020',
                options: [
                    {
                        label: 'ACL4SSR_Online_Full 全包重度用户使用 (与Github同步)',
                        value: 'https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_AdblockPlus 更多去广告 (与Github同步)',
                        value: 'https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_AdblockPlus.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_Tiktok 抖音全量 (与Github同步)',
                        value: 'https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_Tiktok.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_WithIcon (无图标) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_WithIcon.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Mini_MultiMode 自动测速/故障转移/负载均衡 (与Github同步)',
                        value: 'https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Mini_MultiMode.yaml',
                    },
                    {
                        label: '极简分流规则',
                        value: 'https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/极简分流规则.yaml',
                    },
                ],
            },
            {
                label: 'mihomo-party-org',
                options: [
                    {
                        label: '布丁狗的订阅转换 (与Github同步)',
                        value: 'https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/%E5%B8%83%E4%B8%81%E7%8B%97%E7%9A%84%E8%AE%A2%E9%98%85%E8%BD%AC%E6%8D%A2.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full (与Github同步)',
                        value: 'https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_WithIcon (与Github同步)',
                        value: 'https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full_WithIcon.yaml',
                    },
                ],
            },
        ],
        singbox: [
            {
                label: '通用',
                options: [
                    {
                        label: '默认(精简版) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default.yaml',
                    },
                    {
                        label: '默认(精简版) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_NoAds.yaml',
                    },
                    {
                        label: '默认(mini版) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini.yaml',
                    },
                    {
                        label: '默认(mini版) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini_NoAds.yaml',
                    },
                    {
                        label: '默认(全分组) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full.yaml',
                    },
                    {
                        label: '默认(全分组) (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full_NoAds.yaml',
                    },
                    {
                        label: 'DustinWin 全分组版 (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full.yaml',
                    },
                    {
                        label: 'DustinWin 全分组版 (无去广告) (与Github同步)',
                        value: 'https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full_NoAds.yaml',
                    },
                ],
            },
        ],
    };

    if (customMihomoTemplate) {
        data.mihomo[0].options.unshift({ label: '自定义规则', value: customMihomoTemplate });
    }
    if (customSingboxTemplate) {
        data.singbox[0].options.unshift({ label: '自定义规则', value: customSingboxTemplate });
    }

    return JSON.stringify(data);
}

/**
 * 生成模式定义对象（JSON 字符串）。
 * 包含各模式的名称、占位符文本、使用提示及附加参数选项。
 *
 * @param {string} subApi - 转换后端地址（用于展示在提示文本中）
 * @param {string} userAgent - 用户 User-Agent（用于展示在提示文本中）
 * @returns {string} JSON 字符串
 */
export function buildModeOptions(subApi, userAgent) {
    const modes = {
        mihomo: {
            name: 'Clash (mihomo)',
            placeholder: '请输入 Clash 订阅地址，支持各种订阅或单节点链接',
            tipText: `
## Mihomo 使用提示

- 支持各种订阅或单节点链接，自动合并生成配置
- 面板地址: http://127.0.0.1:9090/ui/xd
- mixed(http/socks) 端口: 7890
- 使用 sub-store 后端转换
- 适用于 mihomo 客户端
- 去广告使用 [秋风广告规则](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- 防止 DNS 泄漏（安全 DNS/DoH）
- 屏蔽 WebRTC 泄漏（防止真实 IP 暴露）
- 关闭所有覆写功能以确保配置正常生效

## 附加参数说明

- **UDP**: 启用 UDP 代理流量 [查看详情](https://wiki.metacubex.one/config/proxies/#udp)
- **分应用代理**: 排除 CN 应用（仅 Android）不入代理 [查看详情](https://wiki.metacubex.one/config/inbound/tun/#exclude-package)
- **分IPCIDR代理**: 排除 CN IP 不入代理 [查看详情](https://wiki.metacubex.one/config/inbound/tun/#route-exclude-address)
- **去广告DNS**: 直连使用 [dns.18bit.cn](https://www.18bit.cn)，代理使用 [dns.adguard-dns.com](https://adguard-dns.io/)
- **仅代理**: 关闭 VPN 代理，使用 mixed(http/socks) 端口（关闭 tun 入站）

## 配置信息

**User-Agent** ${userAgent}

**转换后端** ${subApi}
            `,
            protocolOptions: [
                { value: 'udp',      label: '启用 UDP',                    checked: true },
                { value: 'ep',       label: '启用 分应用代理（仅 Android）' },
                { value: 'ea',       label: '启用 分IPCIDR代理（iOS/macOS/Windows/Linux 推荐）' },
                { value: 'adgdns',   label: '启用 去广告DNS' },
                { value: 'tun',      label: '启用 仅代理' },
            ],
        },
        singbox: {
            name: 'Singbox',
            placeholder: '请输入 Singbox 订阅地址，支持各种订阅或单节点链接',
            tipText: `
## Singbox 使用提示

- 支持各种订阅或单节点链接，自动合并生成配置
- 面板地址: http://127.0.0.1:20123
- mixed(http/socks) 端口: 20120
- 使用 sub-store 后端转换
- 适用于 sing-box 客户端（支持 1.11.x / 1.12.x / 1.13.x）
- 去广告使用 [秋风广告规则](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- 防止 DNS 泄漏（安全 DNS/DoH）
- 屏蔽 WebRTC 泄漏（防止真实 IP 暴露）
- 关闭所有覆写功能以确保配置正常生效

## 附加参数说明

- **UDP**: 启用 UDP 代理流量 [查看详情](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#udp_disable_domain_unmapping)
- **UDP 分段**: [查看详情](https://sing-box.sagernet.org/zh/configuration/shared/dial/#udp_fragment)
- **TLS 分段**: 绕过被防火墙拦截的域名 [查看详情](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#tls_fragment)
- **分应用代理**: 排除 CN 应用（仅 Android）[查看详情](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#exclude_package)
- **分IPCIDR代理**: 排除 CN IP [查看详情](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#route_exclude_address)
- **Tailscale**: [查看详情](https://sing-box.sagernet.org/zh/configuration/endpoint/tailscale)
- **去广告DNS**: 直连使用 [dns.18bit.cn](https://www.18bit.cn)，代理使用 [dns.adguard-dns.com](https://adguard-dns.io/)
- **仅代理**: 关闭 VPN 代理，使用 mixed(http/socks) 端口（关闭 tun 入站）

## 配置信息

**User-Agent** ${userAgent}

**转换后端** ${subApi}
            `,
            protocolOptions: [
                { value: 'udp',       label: '启用 UDP',                    checked: true },
                { value: 'udp_frag',  label: '启用 UDP 分段' },
                { value: 'tls_frag',  label: '启用 TLS 分段' },
                { value: 'ep',        label: '启用 分应用代理（仅 Android）' },
                { value: 'ea',        label: '启用 分IPCIDR代理（iOS/macOS/Windows/Linux 推荐）' },
                { value: 'tailscale', label: '启用 Tailscale' },
                { value: 'adgdns',    label: '启用 去广告DNS' },
                { value: 'tun',       label: '启用 仅代理' },
            ],
        },
        v2ray: {
            name: 'V2Ray',
            placeholder: '请输入 V2Ray 订阅地址，支持各种订阅或单节点链接',
            tipText: `
## V2Ray 使用提示

**转换后端** ${subApi}
            `,
            protocolOptions: [],
            noTemplate: true,
        },
    };

    return JSON.stringify(modes);
}
