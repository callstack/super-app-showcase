# Dashboard Application

This is mini application for handling business management flow. Dashboard exposes `MainNavigator`. `MainNavigator` is Dashboard application itself. Dashboard application uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with Dashboard application. If Auth dev server will no be run, Dashboard application will not work as standalone application.

## Setup

Install dependencies for all applications in root directory of this monorepo:
```
yarn bootstrap
```

### Run

Start dev server for all applications in root directory of this monorepo if you need to work as a part of host application. Dashboard application server will run on 9002 port:
```
yarn start
```
Or start dev server for Dashboard application as a standalone app:
```
yarn start:standalone:dashboard
```
Run iOS or Android app (ios | android):
```
yarn run:dashboard:<platform>
```