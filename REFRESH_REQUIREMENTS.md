# Super App Showcase Refresh

**Problem**

The current exemplary codebase (https://github.com/callstack/super-app-showcase) is generic, not representing any real issues of clients that might need MF or super app architecture

**Goal**

Rebuild the showcase to mimic a production-grade Fintech app. We need to demonstrate how React Native and micro-frontends/MF handle the specific performance and security constraints of banking, trading, and insurance within a single, scalable codebase.

**Outcome**

1. A new super app containing following apps:
    1. Host - The main entry point managing authentication, global state, and navigation
    2. Trading - High-frequency UI focused on real-time price feeds and interactive charts
    3. Wallet
    4. Optional
        1. 3rd party apps integration
2. Besides the updated codebase, we need demo/metrics/data confirming our recommended architecture actually brings value, i.e. speeds up CI builds or helps reduce bundle size if when mini app is not included in the initial app download (case for a client using only 2 out of 3 business services offered by a fintech)
    1. What data metrics/data we could track?
3. Updated description, architecture graph on GitHub
4. Article explaining how to use the POC for internal demo and building a business case

# Modules

![image.png](attachment:0562ca58-5201-44bb-9478-44a5568f53b0:image.png)

*Image above is just for reference, no need to copy all styles :D*

## Trading

Screen - List of Assets:

- This screen should be a list of assets (e.g. crypto coins), with the asset icon, name and price
- Use a public WebSocket API like Kraken's to subscribe to a real feed of data: https://support.kraken.com/articles/360022327631-websocket-api-v1-market-data-feed-example
- The price should change in realtime as data from the WS API comes in
- Make sure the components are well structured so only the price component re-renders as updates come in
- The price text should animate to a green color / background if the new price coming in has increased from the previous one, and animate to red if lower value
- Use Reanimated for the price animations
- Use LegendList for a performant list
- Use React Transitions to mark price updates as non-priority, so they don't block the JS thread and maintain smooth interactions
- Pressing a list item should navigate to the "Asset Details" screen

Screen - Asset Details:

- This screen should present details about one specific asset
- On top - a chart showing the evolution of the asset price
- At the middle / bottom - some news about the asset, can be hardcoded
- Use a performant solution for the chart, probably Skia-based, something like [Victory Native XL](https://github.com/FormidableLabs/victory-native-xl)
- The chart should also be showing the price changes in realtime, color animations, React Transitions...
- There should be a button to trade this specific asset. Pressing the button should navigate to the Trade Screen (or maybe open a quick modal or bottom sheet?)

Screen - Trade:

- This screen should have an input for the amount we want to trade, and a button to confirm or cancel
- Confirming the trade should navigate to the Success screen, which should be a fullscreen, no header, opening like a modal, green background, with some checkmark icon in the middle
- Just hardcoded trade, no actual API call
- Dismissing the Success screen should go back to the Asset Details screen showing the chart

## Wallet

Screen - Wallet:

- This screen should show the user's wallet balance (fictitional)
- It should have a smaller list of assets, only the assets the user possesses. It can be hardcoded, say, 1 BTC, 0.5 ETH
- The balance should reflect the result of Asset Quantity * Asset Price. Since the prices are coming in realtime, the balance will also be updated in realtime
- Use same techniques described above for performant animations, performant lists, performant price updates - or even better, reuse components