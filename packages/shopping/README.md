# Shopping Application

This is mini app for shopping service. Shopping exposes `MainNavigator`. `MainNavigator` is Shopping app itself. Shopping app uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with Shopping applicappation. If Auth dev server will no be run, Shopping app will not work as standalone app.

## Setup

Install dependencies for all apps in root directory of this monorepo:

```
pnpm install
```

### Run

Start dev server for all apps in root directory of this monorepo if you need to work as a part of host app. Shopping app server will run on 9001 port:

```
pnpm start
```
