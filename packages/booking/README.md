# Booking Application

This is mini application for booking service. Booking exposes `UpcomingAppointments` screen and `MainNavigator`. `MainNavigator` is Booking application itself. `UpcomingAppointments` screen is a screen, which is used in the super app in its own navigation. Booking application uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with Booking application. If Auth dev server will no be run, Booking application will not work as standalone application.

## Setup

Install dependencies for all applications in root directory of this monorepo:
```
yarn bootstrap
```

### Run

Start dev server for all applications in root directory of this monorepo if you need to work as a part of host application. Booking application server will run on 9000 port:
```
yarn start
```
Or start dev server for Booking application as a standalone app:
```
yarn start:standalone:booking
```
Run iOS or Android app (ios | android):
```
yarn run:booking:<platform>
```