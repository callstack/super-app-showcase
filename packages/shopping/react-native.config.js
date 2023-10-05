const sdk = require('super-app-showcase-sdk');

module.exports = {
  commands: require('@callstack/repack/commands'),
  dependencies: sdk.getAutolinkDependencies(),
};
