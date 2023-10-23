const getSharedDependencies = ({ eager = true }) => {
  const dependencies = require("./deps.json");

  const shared = Object.entries(dependencies).map(([dep, { version }]) => {
    return [dep, { singleton: true, eager, requiredVersion: version }];
  });

  return Object.fromEntries(shared);
};

module.exports = getSharedDependencies;
