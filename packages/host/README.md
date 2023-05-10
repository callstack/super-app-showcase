# Host Application

This is the main app, which is a super app. It contains all the micro-frontends and provides a way to navigate between them. Each remote container except Auth could be opened from Host app. Also Host app uses auth logic and UI (`SignInScreen`, `AccountScreen`). We suggest to run dev server for all apps to prevent issues with mini-apps bundles. Since it is Host app there is no standalone mode, so dev server always will run on 8081 port.

## Setup

Install dependencies for all apps in root directory of this monorepo:

```
yarn
```

Install pods:

```
yarn pods
```

### Run

Start dev server for all apps in root directory of this monorepo:

```
yarn start
```

Or start dev server for Host app:

```
yarn start:host
```

Run iOS or Android app (ios | android):

```
yarn run:host:<platform>
```
