/** Run `dsh plugin add` from the Host process. */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
function nodeProcess() {
    return process;
}
function envString(key) {
    const value = nodeProcess().env[key];
    return typeof value === 'string' && value.length > 0 ? value : undefined;
}
/** Resolve engine root from a known CLI entry path. */
export function resolveEngineCwdFromCliEntry(cliEntry) {
    const normalized = cliEntry.replace(/\\/g, '/');
    // pnpm deploy / packaged: <engine>/lib/bin.js
    if (normalized.endsWith('/lib/bin.js') && !normalized.includes('/apps/cli/')) {
        return join(cliEntry, '..', '..');
    }
    // workspace / fallback copy: <engine>/apps/cli/lib/bin.js
    if (normalized.includes('/apps/cli/lib/bin.js')) {
        return join(cliEntry, '..', '..', '..', '..');
    }
    return join(cliEntry, '..', '..', '..');
}
/** Resolve CLI entry for `node <entry> plugin --profile …`. */
export function resolveCliEntry(config) {
    if (config.dshCliEntry.length > 0) {
        if (!existsSync(config.dshCliEntry)) {
            throw new Error(`DSH CLI 入口不存在：${config.dshCliEntry}`);
        }
        return config.dshCliEntry;
    }
    const fromEnv = envString('DSH_CLI_ENTRY');
    if (fromEnv !== undefined && existsSync(fromEnv))
        return fromEnv;
    const workdir = nodeProcess().cwd();
    const candidates = [
        // Desktop packaged / pnpm deploy layout
        join(workdir, 'lib/bin.js'),
        join(workdir, 'apps/cli/lib/bin.js'),
        join(workdir, 'engine/lib/bin.js'),
        join(workdir, 'engine/apps/cli/lib/bin.js'),
        join(workdir, '../engine/lib/bin.js'),
        join(workdir, '../engine/apps/cli/lib/bin.js'),
        join(workdir, '../../engine/apps/cli/lib/bin.js'),
    ];
    for (const candidate of candidates) {
        if (existsSync(candidate))
            return candidate;
    }
    throw new Error('DSH CLI 未找到。请设置 DSH_CLI_ENTRY 或先在 engine 目录执行 pnpm run build。');
}
/** Resolve Node binary for spawning the CLI. */
export function resolveNodeBinary() {
    return envString('WHALE_DSH_NODE') ?? envString('DSH_NODE') ?? nodeProcess().execPath;
}
/** Execute profile plugin install via staged CLI. */
export function runProfilePluginInstall(config, spec) {
    return runProfilePluginCommand(config, 'add', spec);
}
/** Execute profile plugin remove via staged CLI. */
export function runProfilePluginRemove(config, packageName) {
    return runProfilePluginCommand(config, 'remove', packageName);
}
function runProfilePluginCommand(config, subcommand, target) {
    const cliEntry = resolveCliEntry(config);
    const nodeBinary = resolveNodeBinary();
    const profile = config.profileName;
    const engineCwd = resolveEngineCwdFromCliEntry(cliEntry);
    const args = [cliEntry, 'plugin', '--profile', profile, subcommand, target];
    const cliCommand = `${nodeBinary} ${args.join(' ')}`;
    const cwd = existsSync(engineCwd) ? engineCwd : nodeProcess().cwd();
    // Do NOT use shell:true on win32 — paths with spaces (e.g. "X6")
    // get split by cmd and fail with mojibake stderr. Match desktop launcher spawn.
    const pathSep = nodeProcess().platform === 'win32' ? ';' : ':';
    const pnpmBin = join(cwd, 'node_modules', '.bin');
    const nodeDir = dirname(nodeBinary);
    const prevPath = envString('PATH') ?? envString('Path') ?? '';
    // pnpm shim needs `node` on PATH (Resources/node/bin), not only pnpm itself.
    const pathParts = [];
    if (nodeDir.length > 0 && existsSync(nodeBinary))
        pathParts.push(nodeDir);
    if (existsSync(pnpmBin))
        pathParts.push(pnpmBin);
    if (prevPath.length > 0)
        pathParts.push(prevPath);
    const result = spawnSync(nodeBinary, args, {
        cwd,
        encoding: 'utf8',
        windowsHide: true,
        env: {
            ...nodeProcess().env,
            DSH_CLI_ENTRY: cliEntry,
            PATH: pathParts.join(pathSep),
            ...(envString('WHALE_DSH_NODE') || envString('DSH_NODE')
                ? {}
                : { WHALE_DSH_NODE: nodeBinary }),
        },
    });
    const exitCode = result.status ?? 1;
    const stderr = typeof result.stderr === 'string' ? result.stderr : '';
    const stdout = typeof result.stdout === 'string' ? result.stdout : '';
    if (result.error !== undefined) {
        const code = result.error.code;
        if (code === 'ENOENT') {
            return {
                ok: false,
                exitCode: 127,
                stderr: 'pnpm 或 node 未找到，请确认已安装 pnpm 并可在 PATH 中调用。',
                stdout,
                cliCommand,
            };
        }
        return {
            ok: false,
            exitCode,
            stderr: result.error.message,
            stdout,
            cliCommand,
        };
    }
    return { ok: exitCode === 0, exitCode, stderr, stdout, cliCommand };
}
//# sourceMappingURL=install-runner.js.map