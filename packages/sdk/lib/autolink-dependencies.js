const path = require("path");
const loadConfig = require(require.resolve(
  "@react-native-community/cli-config/build/loadConfig",
  { paths: [process.cwd()] }
)).default;

const config = loadConfig(path.join(__dirname, ".."));

const dependencies = {};
Object.entries(config.dependencies).forEach(([k, v]) => {
  dependencies[k] = v;
  delete v.name;
});

module.exports = dependencies;
