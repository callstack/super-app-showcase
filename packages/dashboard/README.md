# Dashboard Application

This is mini app for handling business management flow. Dashboard exposes `MainNavigator`. `MainNavigator` is Dashboard app itself. Dashboard app uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with Dashboard app. If Auth dev server will no be run, Dashboard app will not work as standalone app.

## Setup

Install dependencies for all apps in root directory of this monorepo:

```
yarn bootstrap
```

### Run

Start dev server for all apps in root directory of this monorepo if you need to work as a part of host app. Dashboard app server will run on 9002 port:

```
yarn start
```
