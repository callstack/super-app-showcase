# Super-App-Showcase Release Process

This document explains the detailed process of releasing the Super-App-Showcase. The release process is divided into three major sections:

1. Releasing Mini-Apps
2. Deploying Catalog-Server
3. Deploying Apps to the Stores

Please follow the below guidelines for each step of the process.

---

## 1. Releasing Mini-Apps

Mini-apps are released by creating and bumping its version via changeset. Please follow these steps to successfully release mini-apps:

1. **Run Changeset Version Command**: Execute the following command to create a changeset:

```bash
pnpm changeset version
```

This assumes that the repository is correctly set up with node_modules installed and there are already some changesets ready to be used for the next version.

2. **Update Compatibility Matrix**: Run the script to update the compatibility matrix. This matrix keeps information on compatibility between mini-apps and the host/shell app. Here's the command to execute:

```bash
pnpm node scripts/update-compatibility-matrix.js
```

This script goes through all the packages in the monorepo and determines their compatibility based on semantic versioning rules. It's vital to have an accurate compatibility matrix because it dictates which versions of federated dependencies are compatible with which versions of the app. It is assumed that the project uses semantic versioning for package versions.

3. **Create a Pull Request (PR)**: Create a PR that includes updated CHANGELOG.md from changesets, bumped version packages, and updated compatibility matrix. The PR should have "Release" in the title. Example: `Release: auth v0.0.1`.

4. **Release Mini-Apps**: After the PR is merged, release the mini-apps by creating and pushing git tags of the specific format: `<mini-app>-<platform>@<version>`. You can use the following command to create a tag:

```bash
git tag auth-ios@0.0.1

git push --tags
```

In this format, `<mini-app>` represents the package name of the mini-apps in the repository (auth, booking, dashboard, shopping), `<platform>` represents either ios or android, and `<version>` represents the current version of that mini-app in its `package.json`.

5. **Create and Upload a Release**: When the tag is pushed, the GitHub workflow is launched for each tag pushed. This workflow creates a build of that mini-app and uploads it to GitHub Releases.

---

## 2. Deploying Catalog-Server

The catalog-server is manually deployed once the mini-apps have been released. It gathers URLs to the releases and deploys itself to production, exposing the mini-apps to the host app in production.

The catalog-server can be deployed via a manual GitHub workflow. This workflow triggers deployment on Vercel where the catalog-server is hosted. The Vercel deployment includes running a build script that reads the 'compatibility-matrix.json' file and generates URLs for iOS and Android application bundles. It organizes the generated URLs into a JSON object, separated by platform and application version, and writes this JSON object to a file named '[appName].prod.json' in the 'data' directory.

For the catalog-server deployment to be successful, ensure that the mini-apps are properly released on GitHub and that the compatibility matrix isn't corrupted.

---

## 3. Deploying Apps to the Stores

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
