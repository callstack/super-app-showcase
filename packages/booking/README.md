# Booking Application

This is mini app for booking service. Booking exposes `UpcomingAppointments` screen and `MainNavigator`. `MainNavigator` is Booking app itself. `UpcomingAppointments` screen is a screen, which is used in the super app in its own navigation. Booking app uses auth logic and UI (`SignInScreen`, `AccountScreen`) from Auth remote module, so we suggest to run Auth dev server to prevent issues with Booking app. If Auth dev server will no be run, Booking app will not work as standalone app.

## Setup

Install dependencies for all apps in root directory of this monorepo:

```
pnpm install
```

### Run

Start dev server for all apps in root directory of this monorepo if you need to work as a part of host app. Booking app server will run on 9000 port:

```
pnpm start
```

Or start dev server for Booking app as a standalone app:

```
pnpm start:standalone:booking
```

Run iOS or Android app (ios | android):

```
pnpm run:booking:<platform>
```
