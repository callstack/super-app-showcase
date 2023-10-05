const getSharedDependencies = (eager = true) => {
  const path = require("path");
  const scriptPackagePath = path.resolve(__dirname, "..", "package.json");
  const scriptPackageJson = require(scriptPackagePath);

  console.log(scriptPackageJson.peerDependencies);

  const combinedDependencies = Object.entries({
    ...scriptPackageJson.peerDependencies,
    ...scriptPackageJson.dependencies,
  });

  const shared = {};
  combinedDependencies.forEach(([dep, version]) => {
    shared[dep] = { singleton: true, eager, requiredVersion: version };
  });

  return shared;
};

module.exports = getSharedDependencies;
