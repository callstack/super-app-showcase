#!/usr/bin/env node

/**
 * Node.js script for managing and updating the compatibility matrix of federated dependencies in a project.
 *
 * This script performs the following actions:
 * - Discovers all the packages with federated dependencies within the project.
 * - Reads an existing compatibility matrix or initializes a new one if it doesn't exist.
 * - Goes through all the relevant packages in the monorepo, and for each of them:
 *   - Determines whether package will be included in the compatibility matrix.
 *   - Goes through all the federated dependencies of the app, and checks their versions.
 *   - Updates the compatibility matrix based on the rules of semantic versioning (semver).
 * - Writes the updated compatibility matrix back to the file.
 *
 * The compatibility matrix is a JSON object where the keys are the app names
 * and the values are objects containing information about the apps's federated
 * dependencies and their versions.
 *
 * The update of the compatibility matrix adheres to the following guidelines:
 * - For app's that experience a major version bump, their dependencies are
 *   deemed compatible and updated in the matrix only if these dependencies also
 *   get a major version bump.
 * - If a app's version is incremented by a minor or patch update, or remains unchanged,
 *   the dependencies are updated in the matrix provided they have not undergone a major version bump.
 *
 * The resulting compatibility matrix can be used to understand which versions of federated dependencies
 * are compatible with which versions of the app.
 *
 * Note: This script assumes the project uses semantic versioning for package versions and that the
 *       structure of the project follows certain rules, such as the presence of a 'package.json'
 *       in every package directory and a 'compatibility-matrix.json' at the root.
 *
 * Note: This is a rather naive implementation of the compatibility matrix update logic. It is meant
 *       to be used as a proof of concept rather than something you would want to use in production.
 */

const fs = require("fs");
const path = require("path");
const semver = require("semver");

const rootDir = path.join(__dirname, "..");
const compatibilityMatrixPath = path.join(rootDir, "compatibility-matrix.json");
const packagesPath = path.join(rootDir, "packages");

function readPackageJson(packagePath) {
  return JSON.parse(fs.readFileSync(packagePath, "utf-8"));
}

function readCompatibilityMatrix() {
  return JSON.parse(fs.readFileSync(compatibilityMatrixPath, "utf-8"));
}

function writeCompatibilityMatrix(matrix) {
  fs.writeFileSync(compatibilityMatrixPath, JSON.stringify(matrix, null, 2));
}

function getPreviousVersion(versions) {
  if (!versions) {
    return null;
  }
  return Object.keys(versions).sort(semver.rcompare)[0];
}

function getCompatibilityMatrix(packages) {
  if (fs.existsSync(compatibilityMatrixPath)) {
    return readCompatibilityMatrix();
  } else {
    return initCompatibilityMatrix(packages);
  }
}

function initCompatibilityMatrix(packages) {
  const matrix = {};

  for (const packageName in packages) {
    const packageData = packages[packageName];
    if (!packageData.federatedDependencies) {
      continue;
    }

    matrix[packageName] = {
      sources: packageData.federatedDependencies,
      versions: {},
    };
  }

  return matrix;
}

function getExternalDependencyVersion(dependency) {
  // Stub function to obtain the version of an external dependency.
  // Implement the logic to fetch the version from the remote location here.
  // As of now, the only external dependency is the news mini-app, and it's version is hardcoded here
  return "0.0.1";
}

function discoverPackagesWithFederatedDependencies() {
  const packageDirs = fs
    .readdirSync(packagesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(packagesPath, dirent.name));

  const packageJsonFiles = packageDirs.map((packageDir) =>
    path.join(packageDir, "package.json")
  );
  const packages = {};

  for (const packageJsonFile of packageJsonFiles) {
    const packageData = readPackageJson(packageJsonFile);
    if (packageData.federatedDependencies || packageData.federatedModule) {
      packages[packageData.name] = {
        path: packageJsonFile,
        version: packageData.version,
        federatedDependencies: packageData.federatedDependencies,
      };
    }
  }
  return packages;
}

function getCurrentDependencyVersion(dependency, packages) {
  if (dependency.type === "internal") {
    return packages[dependency.name]?.version;
  }
  if (dependency.type === "external") {
    return getExternalDependencyVersion(dependency);
  }
}

function updateCompatibilityMatrix() {
  const packages = discoverPackagesWithFederatedDependencies();
  const matrix = getCompatibilityMatrix(packages);

  for (const app in packages) {
    const packageData = packages[app];

    // app is always used only as a dependency
    if (!packageData.federatedDependencies) {
      continue;
    }

    const newVersion = packageData.version;
    const oldVersion = getPreviousVersion(matrix[app]?.versions) || "0.0.0";

    for (const dependency of packageData.federatedDependencies) {
      const newDependencyVersion = getCurrentDependencyVersion(
        dependency,
        packages
      );

      const oldDependencyVersion =
        matrix[app]?.versions?.[oldVersion]?.[dependency.name] || "0.0.0";

      const appVersionDiff = semver.diff(oldVersion, newVersion);
      const dependencyVersionDiff = semver.diff(
        oldDependencyVersion,
        newDependencyVersion
      );

      // get matrix entry for the app or initialize new one
      matrix[app] = matrix[app] || { sources: [], versions: {} };

      // always use the most up-to-date sources of the federatedDependencies
      matrix[app].sources = packageData.federatedDependencies;

      // get version data for the app from the matrix or initialize new one
      matrix[app].versions[newVersion] = matrix[app].versions[newVersion] || {};

      // case 1: app gets a major bump
      if (appVersionDiff === "major") {
        // dependency gets a major bump too - add it to the matrix
        // otherwise mark it as incompatible
        if (dependencyVersionDiff === "major") {
          matrix[app].versions[newVersion][dependency.name] =
            newDependencyVersion;
        } else {
          console.log(
            `Package "${app}" had a major bump but dependency "${
              dependency.name
            }" ${
              dependencyVersionDiff !== null
                ? "only had a " + dependencyVersionDiff + " bump"
                : "remained unchanged"
            }. Marking "${
              dependency.name
            }" version ${newDependencyVersion} as incompatible.`
          );
        }
      }
      // case 2: app gets a minor/patch bump or stays the same
      else {
        // dependency gets a minor/patch bump or stays the same - add it to the matrix
        // otherwise mark it as incompatible
        if (dependencyVersionDiff !== "major") {
          matrix[app].versions[newVersion][dependency.name] =
            newDependencyVersion;
        } else {
          console.log(
            `Package "${app}" ${
              appVersionDiff !== null
                ? "had a " + appVersionDiff + "bump"
                : "remained unchanged"
            }, but the current highest version of the dependency "${
              dependency.name
            }" had a major bump marking it incompatible with this version. Version ${oldDependencyVersion} of "${
              dependency.name
            }" will be used instead.`
          );
          matrix[app].versions[newVersion][dependency.name] =
            oldDependencyVersion;
        }
      }
    }
  }

  writeCompatibilityMatrix(matrix);
}

updateCompatibilityMatrix();
