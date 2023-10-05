#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const scriptPackagePath = path.resolve(__dirname, "..", "package.json");
const scriptPackageJson = require(scriptPackagePath);

// Assuming the script is being run from the project root
const projectPackagePath = path.resolve(process.cwd(), "package.json");
const projectPackageJson = require(projectPackagePath);

const dependencies = scriptPackageJson.dependencies || {};
const peerDependencies = projectPackageJson.peerDependencies || {};

for (const [dep, version] of Object.entries(dependencies)) {
  peerDependencies[dep] = version;
}

projectPackageJson.peerDependencies = peerDependencies;
const updatedProjectPackageJson = JSON.stringify(projectPackageJson, null, 2);

try {
  fs.writeFileSync(projectPackagePath, updatedProjectPackageJson, "utf-8");
  console.log("Peer dependencies updated successfully!");
} catch (error) {
  console.error("An error occurred while updating peer dependencies:", error);
}
