<a href="https://www.callstack.com/open-source?utm_campaign=generic&utm_source=github&utm_medium=referral&utm_content=super-app-showcase" align="center">
  <img src="https://github.com/user-attachments/assets/4ee05e68-54ca-42b3-994c-9de988d66333" alt="Fintech Super App" />
</a>
<h3 align="center">Fintech Super App — React Native with Re.Pack & Module Federation</h3>
<div align="center">

[![mit licence][license-badge]][license]
[![Chat][chat-badge]][chat]
[![PRs Welcome][prs-welcome-badge]][prs-welcome]

</div>

## The problem

As fintech products grow, they need to offer multiple services — trading, portfolio management, account settings — while maintaining independent release cycles and team ownership. A classic monorepo helps draw boundaries but still ships everything together: one team's change can block another's deployment, and every user downloads the entire app regardless of which services they actually use.

At the same time, web teams have had micro-frontend architecture for years. Mobile hasn't had an equivalent — until now.

## The solution

This showcase demonstrates a **production-grade micro-frontend architecture for React Native** using [Re.Pack](https://re-pack.dev) and [Module Federation](https://module-federation.io). Each mini app (Trading, Wallet, Auth) is an independent JavaScript bundle, loaded at runtime by the host shell. Teams can develop, test, and deploy their mini app independently. Users only download the bundles they need.

Key properties of this architecture:
- **Runtime dependencies** — updating a mini app takes effect immediately without a host app release
- **Independent deployability** — each mini app has its own dev server, bundle, and release pipeline
- **Shared singletons** — native libraries (`react-native`, `react-native-reanimated`, etc.) and the live price feed (`KrakenWebSocketService`) are shared across all mini apps at runtime, keeping bundle sizes small and behaviour consistent

## The App

<!-- TODO: add screenshot/GIF of the running app (host with all three tabs visible) -->

A dark-themed Fintech Super App with three tabs:

| Tab | Mini App | Description |
|---|---|---|
| Trading | `packages/trading` | Live crypto asset list, Skia price chart, trade bottom sheet |
| Wallet | `packages/wallet` | Real-time portfolio balance, per-asset holdings |
| Account | `packages/auth` | Demo user profile, sign-out |

Authentication is handled by a shared `AuthProvider` federated from `packages/auth`, gating the tab bar until the user signs in.

## Architecture

<!-- TODO: replace with updated architecture diagram image showing Host → Trading, Wallet, Auth with SDK price feed -->

```
┌─────────────────────────────────────────────────────────┐
│                    host  (port 8081)                    │
│  Native shell · dark theme · GestureHandler root        │
│  PriceProvider (Kraken WebSocket singleton via sdk)     │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ trading 9001 │  │ wallet  9002 │  │  auth   9003 │  │
│  │ Asset list   │  │ Portfolio    │  │ SignInScreen  │  │
│  │ Chart+trade  │  │ Live balance │  │ AuthProvider │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│                   ┌──────────────┐                      │
│                   │     sdk      │                      │
│                   │ KrakenWS svc │                      │
│                   │ PriceProvider│                      │
│                   │ Shared types │                      │
│                   └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

**Key design decisions:**

- All native dependencies live in `host`. Mini apps declare them as `peerDependencies` and consume them as Module Federation shared singletons — no duplicate native modules, no double-initialisation crashes.
- `sdk` is a shared singleton: its `PriceContext` and `KrakenWebSocketService` instance are the same object across host and all mini apps, providing a single WebSocket connection shared by Trading and Wallet.
- Each mini app's `rspack.config.ts` points `resolve.modules` at `../host/node_modules` so the bundler can locate peer deps during compilation without duplicating them.
- `useTransition` wraps all price state updates, marking them as non-priority so live ticks never block user interactions.

## Stack

| | |
|---|---|
| React Native | 0.84 |
| React | 19 |
| Re.Pack | 5.2 (Rspack-based) |
| Module Federation | V2 |
| Animations | react-native-reanimated 4 + react-native-worklets |
| Charts | victory-native 41 (Skia-based) |
| Lists | @legendapp/list 2 |
| Bottom sheet | @gorhom/bottom-sheet 5 |
| Navigation | @react-navigation/native 7 + react-native-bottom-tabs |
| React Compiler | babel-plugin-react-compiler 1.0 |

## Structure

| Package | Role |
|---|---|
| `packages/host` | Native shell — owns binary, all native deps, top-level navigation, MF remote wiring |
| `packages/auth` | Auth mini app — `AuthProvider`, `SignInScreen`, `AccountScreen` |
| `packages/trading` | Trading mini app — live asset list, Skia chart, trade bottom sheet |
| `packages/wallet` | Wallet mini app — real-time portfolio balance and holdings |
| `packages/sdk` | Shared library — `KrakenWebSocketService`, `PriceProvider`, hooks, utils, types |

## Requirements

- Node.js 22+
- pnpm 9.15.3

```bash
npm install -g pnpm@9.15.3
```

On macOS, Homebrew Ruby is required for pod install:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

## Setup

Install dependencies for all packages:

```bash
pnpm install
pnpm pods        # iOS only — install CocoaPods
```

## Running

Start all dev servers (host + all mini apps) via mprocs:

```bash
pnpm start
```

Run on device/simulator:

```bash
pnpm run:host:ios
pnpm run:host:android
```

### Dev server ports

| App | Port |
|---|---|
| host | 8081 |
| trading | 9001 |
| wallet | 9002 |
| auth | 9003 |

## Code quality

```bash
pnpm test        # run all tests
pnpm lint        # ESLint across all packages
pnpm typecheck   # TypeScript across all packages
```

## Contributing

Read the [contribution guidelines](/CONTRIBUTING.md) before contributing.

## Made with ❤️ at Callstack

Fintech Super App is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack][callstack-readme-with-love] is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

<!-- badges -->

[callstack-readme-with-love]: https://callstack.com/?utm_source=github.com&utm_medium=referral&utm_campaign=super-app-showcase&utm_term=readme-with-love
[license-badge]: https://img.shields.io/github/license/callstack/super-app-showcase?style=for-the-badge
[license]: https://github.com/callstack/super-app-showcase/blob/main/LICENSE
[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge
[prs-welcome]: ./CONTRIBUTING.md
[chat-badge]: https://img.shields.io/discord/426714625279524876.svg?style=for-the-badge
[chat]: https://discord.gg/Q4yr2rTWYF