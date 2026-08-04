# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm@11.20.0**. Node.js 24.18+ is required. Ensure both are on PATH before running any commands:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"  # required for pod commands on macOS
```

## Common Commands

```bash
# Install all workspace dependencies
pnpm install

# Start all dev servers (host + all mini apps) via mprocs
pnpm start

# Run on iOS / Android
pnpm run:host:ios
pnpm run:host:android

# Install iOS CocoaPods (run after adding native dependencies)
pnpm pods

# Run across all packages
pnpm lint
pnpm test
pnpm typecheck
pnpm format:check

# Run for a single package
pnpm --filter host test
pnpm --filter trading lint
```

## Architecture

This is a **React Native Fintech Super App** using [Re.Pack](https://re-pack.dev) and **Module Federation V2** (Rspack-based) to load mini apps at runtime as separate JS bundles.

### Workspace packages

| Package            | Role                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `packages/host`    | Native shell — owns the native binary, all native dependencies, top-level navigation, and MF remote wiring            |
| `packages/auth`    | Auth mini app — exposes `AuthProvider`, `SignInScreen`, `AccountScreen`                                               |
| `packages/sdk`     | Shared library — `KrakenWebSocketService`, `PriceProvider`, hooks, utilities, types, `getSharedDependencies()` for MF |
| `packages/trading` | Trading mini app — live asset list, Skia chart with OHLC history, trade bottom sheet                                  |
| `packages/wallet`  | Wallet mini app — real-time portfolio balance using live prices                                                       |

### Module Federation pattern

- **Host** loads remotes eagerly (`eager: true`) and is the only app that runs natively.
- **Mini apps** set `eager: false`, expose only `./App` (their `MainNavigator`), and consume `auth` as a remote.
- All shared deps (react, react-native, navigation libs, sdk) are declared as singletons via `getSharedDependencies()` from `sdk`.
- Each mini app's bundler output `uniqueName` must be unique (e.g. `sas-host`, `sas-trading`).
- TypeScript declarations for all federated imports live in `packages/host/src/declarations.d.ts`.

### How host loads a mini app

```tsx
// In host — lazy load a remote module via React.lazy + Suspense
const TradingApp = React.lazy(() =>
  randomDelay().then(() => import('trading/App')),
);

<ErrorBoundary name="Trading">
  <React.Suspense fallback={<Placeholder label="Trading" />}>
    <TradingApp />
  </React.Suspense>
</ErrorBoundary>;
```

The `randomDelay()` (250–350ms) is intentional for demo purposes — it makes the loading state visible. Remove it for production.

### Native dependencies

**All native deps live in `host`** — mini apps declare them as `peerDependencies` only. When adding a new native dep:

1. Add it to `host/package.json` dependencies
2. Add it to `sdk/lib/dependencies.json` if it should be a MF shared singleton
3. Add it as `peerDependency` in each mini app that uses it
4. Add a `paths` entry in the mini app's `tsconfig.json` pointing to `../host/node_modules/<dep>`
5. Run `pnpm pods` to reinstall iOS pods

### SDK exports

`packages/sdk` is a shared singleton federated across all mini apps. It exports:

- `KrakenWebSocketService` — singleton WebSocket to Kraken, shared across Trading and Wallet
- `PriceProvider` / `PriceContext` — React context wrapping the WS service
- `usePrices()` / `useAssetPrice(symbol)` — price subscription hooks (updates wrapped in `useTransition`)
- `useHistoricalPrices(krakenPair)` — fetches OHLC history from Kraken REST API
- `useFlashAnimation(value)` — Reanimated hook for green/red flash on value change
- `useConnectionStatus()` — WebSocket connection status hook
- `ConnectionBanner` — UI component showing reconnecting/disconnected state
- `ASSETS`, `ASSET_MAP`, `colors`, `formatPrice`, `formatValue`, `getAssetIconUri`

### Auth flow

`AuthProvider` (from `auth` remote) uses a render-prop pattern — it calls `children` with `{ isLoading, isSignout }`. Host's `App.tsx` gates the navigation container behind auth state. Initial state is `isLoading: true` to prevent an unauthenticated shell flash before token restore completes.

### Performance patterns

- **Leaf components**: `PriceCell` (trading) and `ValueCell` (wallet) isolate `useAssetPrice` subscriptions so only the price node re-renders on ticks. The outer row (`AssetRow`, `HoldingRow`) owns Reanimated shared values for the flash animation and never re-renders on price ticks.
- **useTransition**: All price state updates in `usePrices` are wrapped in `startTransition` — price ticks are non-priority and won't block user interactions.
- **startTransition on chart**: `setChartData` in `AssetDetailsScreen` is wrapped in `React.startTransition` to defer chart rebuilds.
- **React Compiler**: `babel-plugin-react-compiler` is enabled across all packages for automatic memoization.

### Dev server ports

| App     | Port |
| ------- | ---- |
| host    | 8081 |
| auth    | 9003 |
| trading | 9001 |
| wallet  | 9002 |

### Mocks for standalone development

Each mini app has a `mocks/` folder with local stubs for federated modules (e.g. `auth/AuthProvider`). These are used when running a mini app standalone without the host.

### Rspack / Re.Pack config

Each package has an `rspack.config.ts`. The loader used is `@callstack/repack/babel-swc-loader`. Asset transforms use `getAssetTransformRules()` — mini apps use `{inline: true}`.

### Testing

Host has a Jest test suite (`pnpm --filter host test`). Key mocks in `packages/host/jest.setup.js`:

- `react-native-gesture-handler/jestSetup`
- `@bottom-tabs/react-navigation` — mocked (native-only, can't run in Jest)
- `react-native-bootsplash` — mocked
- `@callstack/repack/client` — mocked with `auth`, `trading`, `wallet` container stubs
