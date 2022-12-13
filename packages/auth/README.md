## Auth Module

This is not a standalone module. It is a module that is used by other modules to provide authentication and authorization flow and UI. There is no ios or android folders inside it, but all the required native based libraries will be used from the host app bundle. Auth Module exposes a set of components that can be used to build a custom authentication and authorization flow:

- `AuthProvider` - This component containes all the auth logic and UI with hidden implementation and could not be shared across other team working on other modules or applications. `AuthProvider` implements function as child component pattern. This function provides two arguments:
  - `isLoading` - A boolean that indicates if the authentication is in progress.
  - `isSignedOut` - A boolean that indicates if the user is signed out.
- `SignInScreen` - A component that renders the sign in screen with centred login button only.
- `AccountScreen` - A component that renders the account screen with centred logout button only.

All the UI component are tighly coupled with the `AuthProvider` and could not be used without it. So please use `AuthProvider` to wrap your application and use the UI components as needed.

Since there is one more mini application called News used by host and using Auth Module under the hood stored in another repository, it is nessessary not only run the Auth Module server to run the host application but also generate bundle files which should be deployed somewhere to be used by News application.

## Setup

Install dependencies for all applications in root directory in root directory:
```
yarn bootstrap
```

### Run

Start dev server for all applications in root directory since Auth Module could not be run as a standalone app. Auth Module server will run on 9003 port:
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
