<a href="https://www.callstack.com/open-source" align="center">
  <img src="https://github.com/user-attachments/assets/4ee05e68-54ca-42b3-994c-9de988d66333" alt="Super App Showcase" />
</a>
<h3 align="center">Super Apps in React Native with Re.Pack</h3>
<div align="center">

[![mit licence][license-badge]][license]
[![npm downloads][npm-downloads-badge]][npm-downloads]
[![Chat][chat-badge]][chat]
[![PRs Welcome][prs-welcome-badge]][prs-welcome]

</div>

Bring micro-frontend architecture to your mobile [React Native](https://reactnative.dev) app with [Re.Pack](https://re-pack.dev) and make it a Super App. [Learn more.](https://www.callstack.com/services/super-app-development?utm_campaign=super_apps&utm_source=github&utm_content=super_app_showcase)

## The problem

As small apps grow, offering multiple services (payments, messaging, social network, gaming, news, etc.), maintaining them becomes challenging. The codebase can become cluttered, and the app size may deter users who only need a few services. Today, teams dealing with such a challenge can either use monorepo to help draw the boundaries between functionalities, or leverage publishing and consuming packages from npm. However, both approaches have their drawbacks. At the same time, web teams have acccess to micro-frontend architecture, which allows them to split the app into smaller, more manageable parts downloadable on demand.

## The solution

This showcase demonstrates how to achieve a proper micro-frontend architecture for mobile apps with [Module Federation](https://module-federation.io). It simplifies setup and maintenance, allowing independent apps to be deployed separately or as part of a super app. Micro-frontends can be moved to separate repositories, enabling independent team work or external contributions. Unlike classic monorepos, this setup uses runtime dependencies, so updating a micro-frontend automatically updates all apps using it without redeployment.

## The Super App

<table>
  <tr>
    <td>Host App</td>
    <td>Mini Apps Interaction</td>
    <td>Booking Standalone App</td>
  </tr>
  <tr>
    <td><img src="images/host-main-screen.png" alt="host-main-screen" width="200"></td>
    <td><img src="images/host.gif" alt="host" width="200"></td>
    <td><img src="images/booking.gif" alt="booking" width="200"></td>
  </tr>  
</table>

## Structure

<img src="images/super-app-showcase-scheme.png" />

The super app contains 4 apps:

- `host` - the main app, which is a super app. It contains all the micro-frontends and provides a way to navigate between them.
- `booking` - micro-frontend for booking service.
  Booking exposes `UpcomingAppointments` screen and `MainNavigator`. `MainNavigator` is Booking app itself. `UpcomingAppointments` screen is a screen, which is used in the super app in its own navigation.
- `shopping` - micro-frontend for shopping service.
  Shopping exposes `MainNavigator`. `MainNavigator` is Shopping app itself.
- `news` - micro-frontend for news service.
  News exposes `MainNavigator`. `MainNavigator` is News app itself. News mini app stored in separate repository https://github.com/callstack/news-mini-app-showcase to provide the example of using remote container outside of the monorepo.
- `dashboard` - micro-frontend for dashboard service.
  Dashboard exposes `MainNavigator`. `MainNavigator` is Dashboard app itself.
- `auth` - module that is used by other modules to provide authentication and authorization flow and UI.

Each of the mini apps could be deployed and run as a standalone app.

## How to use

### Requirements

⚠️ **Important:** This project requires:

- Node.js version 22 or higher
- pnpm as package manager

Please refer to the official [pnpm installation guide](https://pnpm.io/installation) for detailed setup instructions.

After installation, it's recommended to align your pnpm version with the project:

```bash
pnpm self-update
```

### Setup

Install dependencies for all apps:

```
pnpm install
```

#### iOS

In case automatic pods installation doesn't work when running iOS project, you can install manually:

```
pnpm pods
```

### Running the Super App

Start DevServer for Host and Mini apps:

```
pnpm start
```

Run Super App on iOS or Android (ios | android):

```
pnpm run:host:<platform>
```

### Running the Mini App as a standalone app

> **💡 NOTE**
>
> The "booking" and "shopping" mini-apps can't be run in standalone mode (i.e. without the host running). This is a deliberate decision of this repository to showcase the possibility and to reduce the amount of work to keep the mini-apps dependencies up-to-date.
>
> It's up to you to decide on what kind of developer experience your super app has.

Start DevServer for a Dashboard Mini App as a standalone app:

```
pnpm start:dashboard
```

### Code Quality Scripts

Run tests for all apps:

```
pnpm test
```

Run linter for all apps:

```
pnpm lint
```

Run type check for all apps:

```
pnpm typecheck
```

## Contributing

Read the [contribution guidelines](/CONTRIBUTING.md) before contributing.

## Made with ❤️ at Callstack

Super App showcase is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack][callstack-readme-with-love] is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

<!-- badges -->

[callstack-readme-with-love]: https://callstack.com/?utm_source=github.com&utm_medium=referral&utm_campaign=repack&utm_term=readme-with-love
[license-badge]: https://img.shields.io/npm/l/@callstack/repack?style=for-the-badge
[license]: https://github.com/callstack/repack/blob/main/LICENSE
[npm-downloads-badge]: https://img.shields.io/npm/dm/@callstack/repack?style=for-the-badge
[npm-downloads]: https://www.npmjs.com/package/@callstack/repack
[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge
[prs-welcome]: ./CONTRIBUTING.md
[chat-badge]: https://img.shields.io/discord/426714625279524876.svg?style=for-the-badge
[chat]: https://discord.gg/Q4yr2rTWYF
