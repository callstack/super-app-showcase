/**
 * Creates a final dependency preset to be used
 * in the host/mini-apps by doing the following:
 * - adds depenendencies from dependencies.json and devDependencies.json
 * - adds the SDK as a dev dependency
 * - adds the `super-app` as a capability
 *
 * We use `rnx-kit/align-deps` to align the dependencies.
 * Learn more about it here: https://microsoft.github.io/rnx-kit/docs/guides/dependency-management
 *
 * How to use:
 * 1. Add the following to your package.json:
 * "rnx-kit": {
 *   "kitType": "app",
 *   "alignDeps": {
 *     "presets": [
 *       "./node_modules/super-app-showcase-sdk/preset"
 *     ],
 *     "requirements": [
 *       "super-app-showcase-sdk@0.0.1"
 *     ],
 *     "capabilities": [
 *       "super-app"
 *     ]
 *   }
 * }
 *
 * 2. Run `rnx-align-deps` to check alignment of dependnecies or `rnx-align-deps --write` to align them.
 */
const addSdkCapabilities = (dependencies, devDependencies) => {
  const path = require("path");
  const sdkPackagePath = path.resolve(__dirname, "..", "package.json");
  const sdkPackageJson = require(sdkPackagePath);

  const profile = {
    ...dependencies,
    ...devDependencies,
    "super-app-showcase-sdk": {
      name: "super-app-showcase-sdk",
      version: sdkPackageJson.version,
      devOnly: true,
    },
  };

  return Object.assign(profile, {
    "super-app": {
      name: "#meta",
      capabilities: Object.keys(profile),
    },
  });
};

module.exports = {
  main: addSdkCapabilities(
    require("./dependencies.json"),
    require("./devDependencies.json")
  ),
};
