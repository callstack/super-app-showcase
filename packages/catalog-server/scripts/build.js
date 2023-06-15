#!/usr/bin/env node

/**
 * Node.js script for processing a 'compatibility-matrix.json' file to generate application version specific JSON files.
 *
 * This script performs the following actions:
 * - Reads the 'compatibility-matrix.json' file which contains the versioning and source information for a set of applications.
 * - Parses the data from the file into a JavaScript object.
 * - For each application, it processes its version and source data to generate URLs for iOS and Android application bundles.
 * - The generated URLs are then organized into a JSON object, separated by platform and application version.
 * - This JSON object is then written to a file named '[appName].prod.json' in the 'data' directory.
 *
 * The resulting JSON files can be used to provide version specific download links for each mini-app on iOS and Android platforms.
 *
 * Note: The script assumes the presence of a 'compatibility-matrix.json' file in the project directory and that the file has a specific structure.
 * The 'sources' and 'versions' objects are expected within each app in the matrix, with the versions containing app versions and the sources containing source information.
 * It also assumes that the applications have releases hosted at specific URL patterns.
 */

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
