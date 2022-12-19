# Shell Application

This is the blueprint of Host application with shared dependencies. It could be shared across all the teams, since there no necessary secrets available in this version of host application. Shell application uses auth logic and UI (SignInScreen, AccountScreen). We suggest to run dev server for all applications to prevent issues with mini-apps bundles. Since it is Shell application there is only standalone mode, so dev server always will run on 8081 port. There is no ```start:shell``` script in monorepo to avoid running shell and host app concurrently. It's not possible to run shell and host app concurrently, since they use the same port. If you want to run shell app, you should run yarn ```start:standalone:shell``` and then run each mini application bundler you want to use in shell application.

## Setup

Install dependencies for all applications in root directory in root directory:
```
yarn bootstrap
```

### Run

Start dev server for Shell application as a standalone app:
```
yarn start:standalone:shell
```
Run iOS or Android app (ios | android):
```
yarn run:shell:<platform>
```