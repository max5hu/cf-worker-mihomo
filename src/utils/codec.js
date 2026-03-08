/**
 * utils/codec.js
 *
 * Base64 编解码工具函数。
 * 使用 TextEncoder / TextDecoder 正确处理 UTF-8 多字节字符，
 * 避免 btoa / atob 在处理非 ASCII 字符时出现编码错误。
 */

/**
 * 将 Base64 字符串解码为 UTF-8 字符串。
 * @param {string} str - Base64 编码的字符串
 * @returns {string} 解码后的 UTF-8 字符串
 */
export function base64Decode(str) {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
}

/**
 * 将 UTF-8 字符串编码为 Base64 字符串。
 * @param {string} str - 原始 UTF-8 字符串
 * @returns {string} Base64 编码后的字符串
 */
export function base64Encode(str) {
    const bytes = new TextEncoder().encode(str);
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
}
