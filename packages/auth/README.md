## Auth Module

This is not a standalone module. It is a module that is used by other modules to provide authentication and authorization flow and UI. There is no ios or android folders inside it, but all the required native based libraries will be used from the host app bundle. Auth Module exposes a set of components that can be used to build a custom authentication and authorization flow:

- `AuthProvider` - This component containes all the auth logic and UI with hidden implementation and could not be shared across other team working on other modules or apps. `AuthProvider` implements function as child component pattern. This function provides two arguments:
  - `isLoading` - A boolean that indicates if the authentication is in progress.
  - `isSignedOut` - A boolean that indicates if the user is signed out.
- `SignInScreen` - A component that renders the sign in screen with centred login button only.
- `AccountScreen` - A component that renders the account screen with centred logout button only.

All the UI component are tighly coupled with the `AuthProvider` and could not be used without it. So please use `AuthProvider` to wrap your app and use the UI components as needed.

News mini app is stored in another repository https://github.com/callstack-internal/news-mini-app-template, so there are two ways to use Auth Module in News mini app:

- Generate Auth Module bundle and deploy it to the remote server and use it from the remote server in News mini apps as a remote container
- Run Auth Module server and use it from the localhost in News mini apps as a remote container

Each of these options needs to be configured in News mini app. This could be done in index.js (https://github.com/callstack-internal/news-mini-app-template/blob/main/index.js) file and change auth remote container URL depending on the option you want to use.

## Setup

Install dependencies for all apps in root directory of this monorepo:

```
yarn bootstrap
```

### Run

Start dev server for all apps in root directory of this monorepo since Auth Module could not be run as a standalone app. Auth Module server will run on 9003 port:

```
yarn start
```

Or start dev server for Auth Module only:

```
yarn start:auth
```

### Generate bundle files

Generate iOS or Android bundle files (ios | android):

```
yarn build:auth:<platform>
```
