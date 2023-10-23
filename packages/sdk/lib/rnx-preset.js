const addSdkCapabilities = (deps, devDeps) => {
  const path = require("path");
  const sdkPackagePath = path.resolve(__dirname, "..", "package.json");
  const sdkPackageJson = require(sdkPackagePath);

  const profile = {
    ...deps,
    ...devDeps,
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
  main: addSdkCapabilities(require("./deps.json"), require("./dev-deps.json")),
};
