# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm@9.15.3**. Node.js 22+ is required. Ensure both are on PATH before running any commands:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"  # required for pod commands on macOS
```

## Common Commands

```bash
# Install all workspace dependencies
pnpm install

# Start all dev servers (host + all mini apps) via mprocs
pnpm start

# Start only the dashboard standalone
pnpm start:dashboard

# Run on iOS / Android
pnpm run:host:ios
pnpm run:host:android

# Install iOS CocoaPods (run after adding native dependencies)
pnpm pods

# Run across all packages
pnpm lint
pnpm test
pnpm typecheck

# Run for a single package
pnpm --filter host test
pnpm --filter trading lint
```

## Architecture

This is a **React Native Super App** using [Re.Pack](https://re-pack.dev) and **Module Federation** (Rspack-based) to load mini apps at runtime as separate JS bundles.

### Workspace packages

| Package | Role |
|---|---|
| `packages/host` | Native shell — owns the native binary, all native dependencies, top-level navigation, and MF remote wiring |
| `packages/auth` | Shared authentication mini app — exposes `AuthProvider`, `SignInScreen`, `AccountScreen` |
| `packages/sdk` | Shared config — `getSharedDependencies()` for MF, TypeScript types, shared runtime utilities |
| `packages/trading` | Mini app — real-time crypto asset list, chart, and trade flow |
| `packages/wallet` | Mini app — real-time portfolio balance using live prices |

### Module Federation pattern

- **Host** loads remotes eagerly (`eager: true`) and is the only app that runs natively.
- **Mini apps** set `eager: false`, expose only `./App` (their `MainNavigator`), and consume `auth` as a remote.
- All shared deps (react, react-native, navigation libs) are declared as singletons via `getSharedDependencies()` from `sdk`.
- Each mini app's bundler output `uniqueName` must be unique (e.g. `sas-host`, `sas-trading`).

### How host loads a mini app

```tsx
// In host — lazy load a remote module via React.lazy + Suspense
const TradingApp = React.lazy(() => import('trading/App'));

<ErrorBoundary name="Trading">
  <React.Suspense fallback={<Placeholder label="Trading" />}>
    <TradingApp />
  </React.Suspense>
</ErrorBoundary>
```

### Native dependencies

**All native deps live in `host`** — mini apps declare them as `peerDependencies` only. When adding a new native dep:
1. Add it to `host/package.json` dependencies
2. Add it to `sdk/lib/dependencies.json` if it should be a MF shared singleton
3. Add it as `peerDependency` in each mini app that uses it
4. Run `pnpm pods` to reinstall iOS pods

### Auth flow

`AuthProvider` (from `auth` remote) uses a render-prop pattern — it calls `children` with `{ isLoading, isSignout }`. Host's `App.tsx` gates the navigation container behind auth state.

### Dev server ports

| App | Port |
|---|---|
| auth | 9003 |
| trading | 9001 |
| wallet | 9002 |

### Mocks for standalone development

Each mini app has a `mocks/` folder with local stubs for federated modules (e.g. `auth/AuthProvider`). These are used when running a mini app standalone without the host.

### Rspack / Re.Pack config

Each package has an `rspack.config.ts`. The loader used is `@callstack/repack/babel-swc-loader`. Asset transforms use `getAssetTransformRules()` — mini apps use `{inline: true}`.

## Active Development Plan

See `REFRESH_PLAN.md` for the current implementation plan (Fintech Super App refresh). See `REFRESH_REQUIREMENTS.md` for the product requirements.