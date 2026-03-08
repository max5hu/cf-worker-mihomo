#!/usr/bin/env node

/**
 * esbuild.js
 *
 * 编译脚本，用于将 worker.js 和 vercel.js 分别编译到 dist 目录。
 *
 * 用法：
 *   node esbuild.js              # 编译两个入口文件
 *   node esbuild.js --watch      # 监听文件变化并重新编译
 *   node esbuild.js --analyze    # 生成编译分析报告
 *
 * 输出：
 *   dist/worker.js               # Cloudflare Workers 入口（ESM 格式）
 *   dist/vercel.js               # Vercel Serverless Function 入口（CJS 格式）
 */

import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── 配置常量 ────────────────────────────────────────────────────────────────

/** 编译选项的公共部分 */
const commonOptions = {
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2020'],
    logLevel: 'info',
    // 注意：所有依赖（包括 yaml）都会被打包进输出文件
};

/** Worker 编译配置 */
const workerConfig = {
    ...commonOptions,
    entryPoints: [path.join(__dirname, 'src', 'worker.js')],
    outfile: path.join(__dirname, 'dist', 'worker.js'),
    format: 'esm',
    platform: 'neutral', // Cloudflare Workers 使用中立平台
    define: {
        'process.env.NODE_ENV': '"production"',
    },
};

/** Vercel 编译配置 */
const vercelConfig = {
    ...commonOptions,
    entryPoints: [path.join(__dirname, 'src', 'vercel.js')],
    outfile: path.join(__dirname, 'dist', 'vercel.js'),
    format: 'esm',
    platform: 'node',
    target: ['node18'],
    define: {
        'process.env.NODE_ENV': '"production"',
    },
};

// ─── 工具函数 ────────────────────────────────────────────────────────────────

/**
 * 确保输出目录存在
 */
function ensureDistDir() {
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
        console.log(`✓ 创建输出目录: ${distDir}`);
    }
}

/**
 * 获取文件大小的可读字符串
 */
function getReadableSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * 打印编译结果统计
 */
function printBuildStats(config, result) {
    const outputFile = config.outfile;
    if (fs.existsSync(outputFile)) {
        const stats = fs.statSync(outputFile);
        const size = getReadableSize(stats.size);
        const name = path.basename(outputFile);
        console.log(`  ├─ ${name.padEnd(20)} ${size.padStart(10)}`);
    }
}

/**
 * 执行编译
 */
async function build(configs, options = {}) {
    ensureDistDir();

    console.log('\n🔨 开始编译...\n');

    const startTime = Date.now();

    try {
        // 编译 Worker
        console.log('编译 Cloudflare Workers 入口:');
        const workerResult = await esbuild.build(workerConfig);
        printBuildStats(workerConfig, workerResult);

        // 编译 Vercel
        console.log('\n编译 Vercel Serverless Function 入口:');
        const vercelResult = await esbuild.build(vercelConfig);
        printBuildStats(vercelConfig, vercelResult);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n✓ 编译完成 (${duration}s)\n`);

        // 打印输出目录信息
        const distDir = path.join(__dirname, 'dist');
        console.log(`📦 输出目录: ${distDir}\n`);

        // 列出所有输出文件
        if (fs.existsSync(distDir)) {
            const files = fs.readdirSync(distDir);
            console.log('输出文件列表:');
            files.forEach((file) => {
                const filePath = path.join(distDir, file);
                const stats = fs.statSync(filePath);
                const size = getReadableSize(stats.size);
                console.log(`  ├─ ${file.padEnd(20)} ${size.padStart(10)}`);
            });
            console.log('');
        }

        return true;
    } catch (err) {
        console.error('\n✗ 编译失败:\n');
        console.error(err);
        process.exit(1);
    }
}

/**
 * 监听模式
 */
async function watch() {
    ensureDistDir();

    console.log('\n👀 进入监听模式，按 Ctrl+C 退出...\n');

    try {
        const workerCtx = await esbuild.context(workerConfig);
        const vercelCtx = await esbuild.context(vercelConfig);

        await Promise.all([workerCtx.watch(), vercelCtx.watch()]);

        console.log('✓ 监听已启动，等待文件变化...\n');
    } catch (err) {
        console.error('✗ 监听启动失败:\n');
        console.error(err);
        process.exit(1);
    }
}

/**
 * 分析模式（生成编译分析报告）
 */
async function analyze() {
    ensureDistDir();

    console.log('\n📊 生成编译分析报告...\n');

    try {
        const workerAnalyzeConfig = {
            ...workerConfig,
            metafile: true,
            outfile: path.join(__dirname, 'dist', 'worker.js'),
        };

        const vercelAnalyzeConfig = {
            ...vercelConfig,
            metafile: true,
            outfile: path.join(__dirname, 'dist', 'vercel.js'),
        };

        const workerResult = await esbuild.build(workerAnalyzeConfig);
        const vercelResult = await esbuild.build(vercelAnalyzeConfig);

        // 保存 metafile 用于后续分析
        fs.writeFileSync(
            path.join(__dirname, 'dist', 'worker.meta.json'),
            JSON.stringify(workerResult.metafile, null, 2)
        );
        fs.writeFileSync(
            path.join(__dirname, 'dist', 'vercel.meta.json'),
            JSON.stringify(vercelResult.metafile, null, 2)
        );

        console.log('✓ 分析报告已生成:\n');
        console.log('  ├─ dist/worker.meta.json');
        console.log('  └─ dist/vercel.meta.json\n');

        // 打印模块统计
        console.log('Worker 模块统计:');
        const workerInputs = Object.keys(workerResult.metafile.inputs);
        console.log(`  ├─ 总模块数: ${workerInputs.length}`);
        workerInputs.forEach((input) => {
            const bytes = workerResult.metafile.inputs[input].bytes;
            console.log(`  ├─ ${input.padEnd(40)} ${getReadableSize(bytes).padStart(10)}`);
        });

        console.log('\nVercel 模块统计:');
        const vercelInputs = Object.keys(vercelResult.metafile.inputs);
        console.log(`  ├─ 总模块数: ${vercelInputs.length}`);
        vercelInputs.forEach((input) => {
            const bytes = vercelResult.metafile.inputs[input].bytes;
            console.log(`  ├─ ${input.padEnd(40)} ${getReadableSize(bytes).padStart(10)}`);
        });

        console.log('');
    } catch (err) {
        console.error('✗ 分析失败:\n');
        console.error(err);
        process.exit(1);
    }
}

// ─── 主程序 ──────────────────────────────────────────────────────────────────

async function main() {
    const args = process.argv.slice(2);

    if (args.includes('--watch')) {
        await watch();
    } else if (args.includes('--analyze')) {
        await analyze();
    } else if (args.includes('--help') || args.includes('-h')) {
        console.log(`
esbuild.js - 编译脚本

用法:
  node esbuild.js              # 编译两个入口文件
  node esbuild.js --watch      # 监听文件变化并重新编译
  node esbuild.js --analyze    # 生成编译分析报告
  node esbuild.js --help       # 显示此帮助信息

输出:
  dist/worker.js               # Cloudflare Workers 入口（ESM 格式）
  dist/vercel.js               # Vercel Serverless Function 入口（ESM 格式）
        `);
    } else {
        await build();
    }
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
