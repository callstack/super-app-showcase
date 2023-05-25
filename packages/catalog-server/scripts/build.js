const fs = require('fs');
const path = require('path');

function createAppJSON(matrix) {
  const result = {
    ios: {},
    android: {},
  };

  for (const version in matrix.versions) {
    result.ios[version] = {};
    result.android[version] = {};

    for (const appName in matrix.versions[version]) {
      const appVersion = matrix.versions[version][appName];
      const appInfo = matrix.sources.find(source => source.name === appName);

      const iosBundleURL = `${appInfo.url}/releases/download/${appName}-ios@${appVersion}/[name][ext]`;
      const androidBundleURL = `${appInfo.url}/releases/download/${appName}-android@${appVersion}/[name][ext]`;

      result.ios[version][appName] = iosBundleURL;
      result.android[version][appName] = androidBundleURL;
    }
  }

  return result;
}

const data = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', 'compatibility-matrix.json'),
  'utf8',
);

// parse JSON data
const matrix = JSON.parse(data);

// process each app in the compatibility matrix
for (const appName in matrix) {
  const appMatrix = matrix[appName];

  // generate the JSON data object for the catalog-server
  const appJSON = createAppJSON(appMatrix);

  // save the JSON object to a file synchronously
  const outputFilename = `${appName}.prod.json`;
  fs.writeFileSync(
    path.join(__dirname, '..', 'data', outputFilename),
    JSON.stringify(appJSON, null, 2),
  );

  console.log(`JSON data for app '${appName}' saved to ${outputFilename}`);
}
