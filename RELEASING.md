# Super-App-Showcase Release Process

This document explains the detailed process of releasing the Super-App-Showcase. The release process is divided into two major sections:

1. Deploying Mini App bundles
2. Deploying Host App to the store

Please follow the below guidelines for each step of the process.

---

## 1. Releasing Mini-Apps

🚧 We're working on showcasing an easier and more streamlined deployment process 🚧

---

## 2. Deploying Host App to the Stores

This project uses Expo EAS for building production and submitting production version of the Host app.
The configuration is located inside `packages/host/eas.json`.

Production ENV variables and secrets are already preconfigured on the `expo.dev` site

In order to create a production build of the app you can run:

```sh
eas build --platform ios
# or
eas build --platform android
```

To submit to the stores please use one of the following:

```sh
eas submit --platform ios
# or
eas submit --platform android
```

and choose the build you want to submit.

---
