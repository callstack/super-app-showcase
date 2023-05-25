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
  return Object.keys(versions).sort(semver.rcompare)[0];
}

function getExternalDependencyVersion(dependency) {
  // Stub function to obtain the version of an external dependency.
  // Implement the logic to fetch the version from the remote location here.
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
        federatedDependencies: packageData?.federatedDependencies,
      };
    }
  }
  return packages;
}

function updateCompatibilityMatrix() {
  const matrix = readCompatibilityMatrix();
  const packages = discoverPackagesWithFederatedDependencies();

  for (const packageName in packages) {
    const packageData = packages[packageName];

    // app is always used a dependency only
    if (!packageData.federatedDependencies) {
      continue;
    }

    const newVersion = packageData.version;
    const oldVersion = getPreviousVersion(matrix[packageName]?.versions);

    for (const dependencyName in packageData.federatedDependencies) {
      const dependency = packageData.federatedDependencies[dependencyName];
      let currentDependencyVersion;

      if (dependency.type === "internal") {
        currentDependencyVersion = packages[dependencyName]?.version;
      } else if (dependency.type === "external") {
        currentDependencyVersion = getExternalDependencyVersion(dependency);
      }

      const previousHighestDependencyVersion =
        matrix[packageName]?.versions?.[oldVersion]?.[dependencyName];

      // always use the most up-to-date sources of the federatedDependencies
      matrix[packageName].sources = Object.values(
        packageData.federatedDependencies
      );
      matrix[packageName] = matrix[packageName] || { versions: {} };
      matrix[packageName].versions[newVersion] =
        matrix[packageName].versions[newVersion] || {};

      const appVersionDiff = semver.diff(oldVersion, newVersion);
      // case 1: app gets a major bump
      if (appVersionDiff === "major") {
        // dependency gets a major bump too - add it to the matrix
        // otherwise mark it as incompatible
        const dependencyVersionDiff = semver.diff(
          previousHighestDependencyVersion,
          currentDependencyVersion
        );
        if (dependencyVersionDiff === "major") {
          matrix[packageName].versions[newVersion][dependencyName] =
            currentDependencyVersion;
        } else {
          console.log(
            `Package "${packageName}" had a major bump but dependency "${dependencyName}" ${
              dependencyVersionDiff !== null
                ? "only had a " + dependencyVersionDiff + " bump"
                : "remained unchanged"
            }. Marking "${dependencyName}" version ${currentDependencyVersion} as incompatible.`
          );
        }
      }
      // case 2: app gets a minor/patch bump or stays the same
      else {
        // dependency gets a minor/patch bump or stays the same - add it to the matrix
        // otherwise mark it as incompatible
        const versionDiff = semver.diff(
          previousHighestDependencyVersion,
          currentDependencyVersion
        );
        if (versionDiff !== "major") {
          matrix[packageName].versions[newVersion][dependencyName] =
            currentDependencyVersion;
        } else {
          console.log(
            `Package "${packageName}" ${
              appVersionDiff !== null
                ? "had a " + appVersionDiff + "bump"
                : "remained unchanged"
            }, but the current highest version of the dependency "${dependencyName}" had a major bump marking it incompatible with this version. Version ${previousHighestDependencyVersion} of "${dependencyName}" will be used instead.`
          );
          matrix[packageName].versions[newVersion][dependencyName] =
            previousHighestDependencyVersion;
        }
      }
    }
  }

  writeCompatibilityMatrix(matrix);
}

updateCompatibilityMatrix();
