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
        federatedDependencies: packageData?.federatedDependencies,
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

      // always use the most up-to-date sources of the federatedDependencies
      matrix[app].sources = packageData.federatedDependencies;
      matrix[app] = matrix[app] || { versions: {} };
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
