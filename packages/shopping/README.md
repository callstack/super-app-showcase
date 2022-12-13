# Shopping Application

This is mini application for shopping service. Shopping exposes `MainNavigator`. `MainNavigator` is Shopping application itself. Shopping application uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with Shopping application. If Auth dev server will no be run, Shopping application will not work as standalone application.

## Setup

Install dependencies for all applications in root directory in root directory:
```
yarn bootstrap
```

### Run

Start dev server for all applications in root directory if you need to work as a part of host application. Shopping application server will run on 9001 port:
```
yarn start
```
Or start dev server for Shopping application as a standalone app:
```
yarn start:standalone:shopping
```
Run iOS or Android app (ios | android):
```
yarn run:shopping:<platform>
```