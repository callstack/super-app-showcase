<a href="https://www.callstack.com/open-source?utm_campaign=generic&utm_source=github&utm_medium=referral&utm_content=super-app-showcase" align="center">
  <img src="https://github.com/user-attachments/assets/4ee05e68-54ca-42b3-994c-9de988d66333" alt="Fintech Super App" />
</a>
<h3 align="center">Fintech Super App — React Native with Re.Pack & Module Federation</h3>
<div align="center">

[![mit licence][license-badge]][license]
[![Chat][chat-badge]][chat]
[![PRs Welcome][prs-welcome-badge]][prs-welcome]

</div>

A production-grade **Fintech Super App** demo built with [React Native](https://reactnative.dev), [Re.Pack](https://re-pack.dev), and **Module Federation**. It demonstrates micro-frontend architecture for mobile: independent mini apps (Trading, Wallet) loaded at runtime into a host shell, sharing a live WebSocket price feed from Kraken.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                     host (port 8081)                │
│  Native shell · dark theme · GestureHandler root    │
│  PriceProvider (Kraken WS singleton via sdk)        │
│                                                     │
│   ┌──────────────────┐   ┌──────────────────┐      │
│   │  trading (9001)  │   │  wallet  (9002)  │      │
│   │  Asset list      │   │  Portfolio bal.  │      │
│   │  Chart + trade   │   │  Live holdings   │      │
│   └──────────────────┘   └──────────────────┘      │
│                                                     │
│   ┌──────────────────┐   ┌──────────────────┐      │
│   │   auth  (9003)   │   │       sdk        │      │
│   │  Sign-in screen  │   │  KrakenWS service│      │
│   │  AuthProvider    │   │  Shared types    │      │
│   └──────────────────┘   └──────────────────┘      │
└─────────────────────────────────────────────────────┘
```

**Key design decisions:**
- All native dependencies live in `host`. Mini apps declare them as `peerDependencies` and consume them as Module Federation shared singletons.
- `sdk` is itself a shared singleton — its `PriceContext` and `KrakenWebSocketService` instance are the same object across host and all mini apps.
- `rspack.config.ts` in each mini app points `resolve.modules` at `../host/node_modules` so the bundler can locate peer deps during compilation.

## Stack

| | |
|---|---|
| React Native | 0.84 |
| React | 19 |
| Re.Pack | 5.2 (Rspack) |
| Module Federation | V2 |
| Animations | react-native-reanimated 4 + react-native-worklets |
| Charts | victory-native 41 (Skia-based) |
| Lists | @legendapp/list 2 |
| Bottom sheet | @gorhom/bottom-sheet 5 |
| React Compiler | babel-plugin-react-compiler 1.0 |

## Structure

| Package | Role |
|---|---|
| `packages/host` | Native shell — owns binary, all native deps, top-level navigation, MF remote wiring |
| `packages/auth` | Auth mini app — `AuthProvider`, `SignInScreen`, `AccountScreen` |
| `packages/trading` | Trading mini app — live asset list, Skia chart, trade bottom sheet |
| `packages/wallet` | Wallet mini app — real-time portfolio balance |
| `packages/sdk` | Shared library — `KrakenWebSocketService`, `PriceProvider`, `useAssetPrice`, types |

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

```bash
pnpm install
pnpm pods        # iOS only — install CocoaPods
```

## Running

Start all dev servers (host + mini apps) via mprocs:

```bash
pnpm start
```

Run on device/simulator:

```bash
pnpm run:host:ios
pnpm run:host:android
```

## Dev server ports

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

Super App Showcase is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack][callstack-readme-with-love] is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

<!-- badges -->

[callstack-readme-with-love]: https://callstack.com/?utm_source=github.com&utm_medium=referral&utm_campaign=super-app-showcase&utm_term=readme-with-love
[license-badge]: https://img.shields.io/github/license/callstack/super-app-showcase?style=for-the-badge
[license]: https://github.com/callstack/super-app-showcase/blob/main/LICENSE
[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge
[prs-welcome]: ./CONTRIBUTING.md
[chat-badge]: https://img.shields.io/discord/426714625279524876.svg?style=for-the-badge
[chat]: https://discord.gg/Q4yr2rTWYF