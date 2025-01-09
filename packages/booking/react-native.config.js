const useWebpack =
  process.env.USE_WEBPACK === 'true' || process.env.USE_WEBPACK === '1';

module.exports = {
  commands: useWebpack
    ? require('@callstack/repack/commands/webpack')
    : require('@callstack/repack/commands/rspack'),
};
