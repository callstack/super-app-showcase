/**
 * Collect shared dependencies from the SDK and expose them
 * for the ModuleFederationPlugin.
 *
 * @param {{ eager: boolean }} options Options for the shared dependencies. Use eager: false if using in a mini-app.
 * @returns Shared dependencies object.
 */
const getSharedDependencies = ({ eager = true }) => {
  const dependencies = require("./dependencies.json");

  const shared = Object.entries(dependencies).map(([dep, { version }]) => {
    return [dep, { singleton: true, eager, requiredVersion: version }];
  });

  return Object.fromEntries(shared);
};

module.exports = getSharedDependencies;
