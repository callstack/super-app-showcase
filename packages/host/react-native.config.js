const useWebpack = Boolean(process.env.USE_WEBPACK);

module.exports = {
  commands: useWebpack
    ? require('@callstack/repack/commands/webpack')
    : require('@callstack/repack/commands/rspack'),
};
