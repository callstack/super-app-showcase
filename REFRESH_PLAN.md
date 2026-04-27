# Fintech Super App — Implementation Plan

## Overview

Rebuild the Super App Showcase into a production-grade Fintech demo app called **Fintech Super App**.  
Stack: React Native 0.84, Re.Pack 5, Module Federation, React 19, dark theme.  
Mini apps: **Trading** and **Wallet**. Shared price feed via **sdk** package.

---

## US-1: Repo Cleanup

> As a developer, I want the repo stripped of irrelevant packages so I only work with code that belongs to the new Fintech showcase.

**Tasks**

- [ ] Delete `packages/booking`, `packages/shopping`, `packages/dashboard`
- [ ] Remove `booking`, `shopping`, `dashboard` from `pnpm-workspace.yaml`
- [ ] Remove old remote references from `host` MF config (`rspack.config.ts`)
- [ ] Remove old mini-app navigation entries from `host` navigation
- [ ] Verify `pnpm install` still resolves cleanly after deletions

---

## US-2: Shared WebSocket Price Feed (sdk)

> As a developer, I want a singleton WebSocket service in the `sdk` package so both Trading and Wallet receive live Kraken prices from a single connection.

**Tasks**

- [ ] Add `src/` to `packages/sdk` and wire up its `index.ts` exports
- [ ] Implement `KrakenWebSocketService` — singleton managing one WS connection to `wss://ws.kraken.com`
- [ ] Subscribe to ticker feed for fixed asset list: BTC/USD, ETH/USD, SOL/USD, XRP/USD, ADA/USD
- [ ] Define shared `Asset` and `PriceUpdate` TypeScript types
- [ ] Create `PriceContext` + `PriceProvider` (React context) that consumes the service and exposes latest prices
- [ ] Create `usePrices()` and `useAssetPrice(symbol)` hooks
- [ ] Export everything from `packages/sdk/index.ts`
- [ ] Update `sdk` `package.json` with proper `main`/`types` fields

---

## US-3: Host App Shell

> As a user, I want to open the Fintech Super App and see a polished dark shell with a bottom tab bar for Trading and Wallet.

**Tasks**

- [ ] Install native dependencies into `host`:
  - `react-native-reanimated`
  - `@shopify/react-native-skia`
  - `victory-native`
  - `@legendapp/list`
  - `@gorhom/bottom-sheet`
- [ ] Enable R8/Proguard in `host/android/app/build.gradle`: set `enableProguardInReleaseBuilds = true` for Android code shrinking
- [ ] Re-run `pnpm pods` after native dep install
- [ ] Update app name to **Fintech Super App** (iOS `Info.plist`, Android `strings.xml`)
- [ ] Set up global dark theme using `react-native-paper` `Provider` with a custom dark Fintech palette
- [ ] Replace existing tab/drawer navigation in `host` with a bottom tab bar (`react-native-bottom-tabs`) with two tabs: **Trading** and **Wallet**
- [ ] Wire MF remotes in `host` rspack config: `trading@localhost:9001`, `wallet@localhost:9002`
- [ ] Lazy-load `trading/App` and `wallet/App` as tab screens
- [ ] Wrap app in `PriceProvider` from `sdk` so the WS connection starts on app launch

---

## US-4: Auth — Dark Fintech Sign-In Screen

> As a user, I want a polished dark sign-in screen as the entry point that I can skip with one tap.

**Tasks**

- [ ] Restyle `packages/auth/src/screens/SignInScreen.tsx` with dark Fintech theme (dark background, accent color, clean typography)
- [ ] Replace form fields with a single **"Sign In as Demo User"** button (skippable demo login, hardcoded credentials)
- [ ] Ensure `AuthProvider` gates the tab bar — unauthenticated users see only `SignInScreen`
- [ ] Add app logo / name "Fintech Super App" to the sign-in screen header

---

## US-5: Trading — Asset List Screen

> As a trader, I want to see a live-updating list of crypto assets with animated price changes so I can monitor the market at a glance.

**Tasks**

- [ ] Scaffold `packages/trading` package (copy structure from a deleted mini app, update names)
- [ ] Configure MF in `trading/rspack.config.ts`: exposes `./App`, remotes `auth`, shared deps, port 9001
- [ ] Add `trading` to `pnpm-workspace.yaml` and install deps
- [ ] Declare native deps (Reanimated, Skia, Victory Native, LegendList, `@gorhom/bottom-sheet`) as `peerDependencies` in `trading/package.json`
- [ ] Create `AssetListScreen` using `LegendList` for performant rendering
- [ ] Fetch asset icons from public CDN (e.g. `https://cryptoicons.org/api/icon/{symbol}/32`) per row
- [ ] Connect each row to `useAssetPrice(symbol)` from `sdk`
- [ ] Wrap price state updates in `useTransition` to mark them as non-priority
- [ ] Animate price text with `react-native-reanimated`: green flash on price increase, red flash on price decrease
- [ ] Navigate to `AssetDetailsScreen` on row press, passing asset symbol

---

## US-6: Trading — Asset Details Screen

> As a trader, I want to see a live chart and recent news for a specific asset so I can make an informed trade decision.

**Tasks**

- [ ] Create `AssetDetailsScreen` receiving asset symbol as route param
- [ ] Maintain a 60-tick in-memory price buffer using a `useRef` array, updated via `useAssetPrice`
- [ ] Render live price chart using `victory-native` (Skia-based) fed from the 60-tick buffer
- [ ] Apply green/red color animation on the chart line on price change (Reanimated + `useTransition`)
- [ ] Add hardcoded news section below the chart (3–4 static news items as a data array)
- [ ] Add **"Trade"** button that opens the Trade bottom sheet

---

## US-7: Trading — Trade Flow (Bottom Sheet + Success Screen)

> As a trader, I want to enter a trade amount and confirm it, then see a success confirmation so I know the trade was placed.

**Tasks**

- [ ] Install / confirm `@gorhom/bottom-sheet` is available (provided by host)
- [ ] Create `TradeBottomSheet` component: asset name header, amount text input (uncontrolled — use `defaultValue` + `ref` to avoid per-keystroke re-renders), **Confirm** and **Cancel** buttons
- [ ] Wire **Cancel** to close the bottom sheet
- [ ] Wire **Confirm** to close the sheet and navigate to `TradeSuccessScreen`
- [ ] Create `TradeSuccessScreen`: full-screen, no header, `presentation: 'modal'`, green background, checkmark icon in the center
- [ ] Dismissing `TradeSuccessScreen` (back gesture or button) returns to `AssetDetailsScreen`

---

## US-8: Wallet — Real-Time Portfolio Screen

> As a user, I want to see my total wallet balance and asset holdings updating in real time so I always know my portfolio value.

**Tasks**

- [ ] Scaffold `packages/wallet` package (same approach as trading)
- [ ] Configure MF in `wallet/rspack.config.ts`: exposes `./App`, remotes `auth`, shared deps, port 9002
- [ ] Add `wallet` to `pnpm-workspace.yaml` and install deps
- [ ] Declare native deps as `peerDependencies` in `wallet/package.json`
- [ ] Hardcode user holdings: `[{ symbol: 'BTC', quantity: 1 }, { symbol: 'ETH', quantity: 0.5 }]`
- [ ] Create `WalletScreen` showing total balance (`Σ quantity * livePrice`) updated in real time
- [ ] Render holdings as a small list using `LegendList` with live per-asset value (`quantity * livePrice`)
- [ ] Reuse price animation components from `sdk` (or `trading` if shared) for value changes
- [ ] Wrap balance/price updates in `useTransition`

---

## US-9: Polish & Consistency

> As a developer, I want the app to look and feel consistent across all screens so it presents well in demos.

**Tasks**

- [ ] Configure React Compiler (`babel-plugin-react-compiler`) in `babel.config.js` for `host`, `trading`, and `wallet` — automatic memoization for React 19
- [ ] Audit all screens for consistent dark theme (colors, typography, spacing)
- [ ] Add loading states for WS connection (skeleton or spinner before first price tick arrives)
- [ ] Add error state if WS connection drops (reconnect logic in `KrakenWebSocketService`)
- [ ] Verify navigation transitions feel smooth (no jank when switching tabs or opening bottom sheet)
- [ ] Update `README.md`: new app name, updated architecture diagram description, new setup instructions
- [ ] Update architecture diagram image in `images/` to reflect new structure (Host → Trading, Wallet; SDK price feed)

---

## Post-Build (Out of Scope for Initial Implementation)

> Metrics and article — to be done after the app is working.

- [ ] Measure bundle sizes with and without each mini app excluded from the host build
- [ ] Record CI build times for full build vs. single mini app build
- [ ] Document findings in a `metrics/` folder (bundle size scripts, timing comparisons)
- [ ] Write article: how to use the POC for internal demos and building a business case