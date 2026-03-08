/**
 * ui/template.js
 *
 * HTML 页面生成器。
 * 将运行时配置（备案信息、模式定义、模板配置等）注入到 HTML 模板中，
 * 返回完整的 HTML 字符串供浏览器渲染。
 */

import { buildStyles } from './styles.js';
import { buildConfigOptions, buildModeOptions } from './config-options.js';

/** GitHub 仓库地址（Base64 编码，防止被爬虫直接抓取） */
const GITHUB_REPO_URL = atob('aHR0cHM6Ly9naXRodWIuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21v');

/**
 * 生成完整的前端 HTML 页面字符串。
 *
 * @param {Object} ctx - 请求上下文
 * @param {string} ctx.backgroundImage - 背景图片地址
 * @param {string} ctx.beianText - 备案文字
 * @param {string} ctx.beianUrl - 备案链接
 * @param {string} ctx.subApi - 转换后端地址
 * @param {string} ctx.userAgent - 用户 User-Agent
 * @param {string} ctx.customMihomoTemplate - 自定义 Mihomo 模板地址
 * @param {string} ctx.customSingboxTemplate - 自定义 Singbox 模板地址
 * @returns {string} 完整的 HTML 字符串
 */
export function buildHtmlPage(ctx) {
    const styles       = buildStyles(ctx);
    const modesJson    = buildModeOptions(ctx.subApi, ctx.userAgent);
    const configsJson  = buildConfigOptions(ctx.customMihomoTemplate, ctx.customSingboxTemplate);

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="https://cdn.jsdelivr.net/gh/Kwisma/cf-worker-mihomo@main/favicon.png">
    <title>配置转换工具</title>
    <style>${styles}</style>
    <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.5/dist/purify.min.js"></script>
</head>
<body>
    <a href="${GITHUB_REPO_URL}" target="_blank" class="github-corner" aria-label="View source on Github">
        <svg viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
        </svg>
    </a>

    <div class="container">
        <div class="logo-title">
            <h1>配置转换工具</h1>
        </div>

        <!-- 模式切换按钮（由 JS 动态生成） -->
        <div class="config-toggle" id="mode-toggle"></div>

        <!-- 各模式内容容器（由 JS 动态生成） -->
        <div id="mode-containers"></div>

        <div class="input-group">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <label for="result">订阅地址：</label>
            </div>
            <input type="text" id="result" readonly onclick="copyToClipboard()">
            <label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
        </div>

        <div class="beian-info">
            <a href="${ctx.beianUrl}" target="_blank">${ctx.beianText}</a>
        </div>
    </div>

    <script>
        // ─── 数据注入 ───────────────────────────────────────────────────────────
        const MODES   = ${modesJson};
        const CONFIGS = ${configsJson};

        // ─── 状态 ───────────────────────────────────────────────────────────────
        let activeMode = 'mihomo';

        // ─── 初始化 ─────────────────────────────────────────────────────────────
        document.addEventListener('DOMContentLoaded', function () {
            initModeToggle();
            initModeContainers();
            setActiveMode(activeMode);
            initTipSystem();
            initAllTemplateSelectors();
            document.getElementById('qrcode').classList.remove('show');
        });

        /** 渲染模式切换按钮 */
        function initModeToggle() {
            const container = document.getElementById('mode-toggle');
            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const btn = document.createElement('div');
                btn.className = 'toggle-option';
                btn.dataset.mode = modeId;
                btn.textContent = modeConfig.name;
                btn.addEventListener('click', () => setActiveMode(modeId));
                container.appendChild(btn);
            }
        }

        /** 渲染各模式内容容器 */
        function initModeContainers() {
            const wrapper = document.getElementById('mode-containers');

            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const container = document.createElement('div');
                container.id = modeId + '-container';
                container.className = 'mode-options';

                // 模板选择器
                if (!modeConfig.noTemplate) {
                    const selector = document.createElement('div');
                    selector.className = 'template-selector';
                    selector.innerHTML = \`
                        <div class="template-toggle collapsed">选择配置模板（未选择）</div>
                        <div class="template-options"></div>
                    \`;
                    container.appendChild(selector);
                }

                // 订阅链接输入组
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';

                const linkLabel = document.createElement('div');
                linkLabel.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 6px;';
                linkLabel.innerHTML = \`
                    <label for="link" style="margin: 0;">订阅链接</label>
                    <div class="tip-wrapper">
                        <span class="tip-icon" data-mode="\${modeId}">!</span>
                        <div class="tip-panel"></div>
                    </div>
                \`;
                inputGroup.appendChild(linkLabel);

                const linkContainer = document.createElement('div');
                linkContainer.id = 'link-container-' + modeId;
                linkContainer.innerHTML = \`
                    <div class="link-row">
                        <input type="text" class="link-input" placeholder="\${modeConfig.placeholder}" />
                        <div class="add-btn" onclick="addLinkInput(this, '\${modeId}')">➕</div>
                    </div>
                \`;
                inputGroup.appendChild(linkContainer);

                // 附加参数选项
                if (!modeConfig.noTemplate) {
                    const paramLabel = document.createElement('label');
                    paramLabel.textContent = '附加参数选项';
                    inputGroup.appendChild(paramLabel);

                    const paramOptions = document.createElement('div');
                    paramOptions.className = 'protocol-options';

                    modeConfig.protocolOptions.forEach(option => {
                        const label = document.createElement('label');
                        label.className = 'protocol-checkbox';
                        label.innerHTML = \`
                            <input type="checkbox" name="protocol" value="\${option.value}" \${option.checked ? 'checked' : ''}>
                            \${option.label}
                        \`;
                        paramOptions.appendChild(label);
                    });

                    inputGroup.appendChild(paramOptions);
                }

                container.appendChild(inputGroup);

                // 生成按钮
                const genBtn = document.createElement('button');
                genBtn.textContent = '生成 ' + modeConfig.name + ' 配置';
                genBtn.onclick = function () { generateConfig(modeId); copyToClipboard(); };
                container.appendChild(genBtn);

                wrapper.appendChild(container);
            }
        }

        /** 切换活动模式 */
        function setActiveMode(modeId) {
            document.querySelectorAll('.toggle-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === modeId);
            });
            document.querySelectorAll('.mode-options').forEach(c => {
                c.classList.toggle('active', c.id === modeId + '-container');
            });

            const modeName = MODES[modeId]?.name || '';
            document.title = modeName ? modeName + '配置转换工具' : '配置转换工具';
            const h1 = document.querySelector('h1');
            if (h1) h1.textContent = modeName ? modeName + '配置转换工具' : '配置转换工具';

            updateResult('');
            activeMode = modeId;
        }

        /** 初始化使用提示弹窗 */
        function initTipSystem() {
            document.querySelectorAll('.tip-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
                    const wrapper = icon.closest('.tip-wrapper');
                    wrapper.classList.toggle('active');
                    const panel = wrapper.querySelector('.tip-panel');
                    const rawMd = MODES[icon.dataset.mode]?.tipText || '暂无提示内容';
                    panel.innerHTML = DOMPurify.sanitize(marked.parse(rawMd));
                });
            });
            document.addEventListener('click', () => {
                document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
            });
        }

        /** 初始化所有模板选择器 */
        function initAllTemplateSelectors() {
            for (const modeId of Object.keys(MODES)) {
                if (!MODES[modeId].noTemplate && CONFIGS[modeId]) {
                    initTemplateSelector(modeId, CONFIGS[modeId]);
                }
            }
        }

        /** 初始化单个模板选择器 */
        function initTemplateSelector(modeId, configGroups) {
            const selector       = document.querySelector('#' + modeId + '-container .template-selector');
            const toggle         = selector.querySelector('.template-toggle');
            const optionsWrapper = selector.querySelector('.template-options');

            configGroups.forEach(group => {
                const groupHeader = document.createElement('div');
                groupHeader.style.cssText = 'padding: 10px 20px; font-weight: bold; color: #555; background-color: #f5f5f5;';
                groupHeader.textContent = group.label;
                optionsWrapper.appendChild(groupHeader);

                group.options.forEach(option => {
                    const item = document.createElement('div');
                    item.className = 'template-option';
                    item.textContent = option.label;
                    item.dataset.value = option.value;
                    item.dataset.group = group.label;

                    item.addEventListener('click', function () {
                        selector.querySelectorAll('.template-option.selected').forEach(el => el.classList.remove('selected'));
                        toggle.textContent = group.label + ' - ' + option.label;
                        this.classList.add('selected');
                        toggle.classList.add('collapsed');
                        optionsWrapper.classList.remove('show');
                    });

                    optionsWrapper.appendChild(item);
                });
            });

            // 默认选中第一项
            const firstItem = selector.querySelector('.template-option');
            if (firstItem) {
                firstItem.classList.add('selected');
                toggle.textContent = '请选择配置模板（默认 - ' + firstItem.dataset.group + '）';
            }

            toggle.addEventListener('click', function () {
                this.classList.toggle('collapsed');
                optionsWrapper.classList.toggle('show');
            });

            document.addEventListener('click', function (e) {
                if (!toggle.contains(e.target) && !optionsWrapper.contains(e.target)) {
                    toggle.classList.add('collapsed');
                    optionsWrapper.classList.remove('show');
                }
            });
        }

        /** 添加订阅链接输入框 */
        function addLinkInput(btn, modeId) {
            const container = document.getElementById('link-container-' + modeId);
            const row = document.createElement('div');
            row.className = 'link-row';

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'link-input';
            input.placeholder = MODES[modeId].placeholder;

            btn.style.display = 'none';
            row.appendChild(input);
            container.appendChild(row);

            const newBtn = document.createElement('div');
            newBtn.className = 'add-btn';
            newBtn.textContent = '➕';
            newBtn.onclick = function () { addLinkInput(newBtn, modeId); };
            row.appendChild(newBtn);
        }

        /** 生成配置订阅链接 */
        function generateConfig(modeId) {
            const inputs = document.querySelectorAll('#' + modeId + '-container .link-input');

            let templateLink = '';
            if (!MODES[modeId].noTemplate) {
                const selected = document.querySelector('#' + modeId + '-container .template-option.selected');
                templateLink = selected ? selected.dataset.value : '';
            }

            const params = {};
            document.querySelectorAll('#' + modeId + '-container .protocol-options input[type="checkbox"]').forEach(cb => {
                params[cb.value] = cb.checked;
            });

            const links = Array.from(inputs).map(i => i.value.trim()).filter(Boolean);

            if (links.length === 0) {
                alert('请输入至少一个订阅链接');
                return;
            }

            const queryParts = [];
            if (templateLink) queryParts.push('template=' + encodeURIComponent(templateLink));
            if (links.length > 0) queryParts.push('url=' + links.map(encodeURIComponent).join(','));
            queryParts.push(modeId + '=true');

            for (const [key, enabled] of Object.entries(params)) {
                if (enabled) queryParts.push(key + '=true');
            }

            updateResult(window.location.origin + '/?' + queryParts.join('&'));
        }

        /** 复制结果到剪贴板 */
        function copyToClipboard() {
            const input = document.getElementById('result');
            if (!input.value) return;

            input.select();
            navigator.clipboard.writeText(input.value).then(() => {
                const toast = document.createElement('div');
                toast.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);padding:8px 16px;background:#4361ee;color:white;border-radius:4px;z-index:1000;';
                toast.textContent = '已复制到剪贴板';
                document.body.appendChild(toast);
                setTimeout(() => document.body.removeChild(toast), 2000);
            }).catch(() => alert('复制失败，请手动复制'));
        }

        /** 更新结果输入框和二维码 */
        function updateResult(url) {
            document.getElementById('result').value = url;
            const qrDiv = document.getElementById('qrcode');

            if (url) {
                qrDiv.classList.add('show');
                qrDiv.innerHTML = '';
                new QRCode(qrDiv, {
                    text: url,
                    width: 220,
                    height: 220,
                    colorDark: '#4a60ea',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.L,
                    scale: 1,
                });
            } else {
                qrDiv.classList.remove('show');
                qrDiv.innerHTML = '';
            }
        }
    </script>
</body>
</html>`;
}
