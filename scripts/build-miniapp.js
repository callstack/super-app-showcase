#!/usr/bin/env node

const { spawn } = require("child_process");

const gitTag = process.argv[2];
const gitTagPattern = /^([\w-]+)-(\w+)@([\d.]+)$/;

const match = gitTag.match(gitTagPattern);

if (!match) {
  console.error(
    "Invalid git tag format. Expected format: <packageName>-<platform>@<version>"
  );
  process.exit(1);
}

const packageName = match[1];
const platform = match[2];
const version = match[3];

console.log(`Package Name: ${packageName}`);
console.log(`Platform: ${platform}`);
console.log(`Version: ${version}`);

let scriptName;
if (platform === "android") {
  scriptName = "bundle:android";
} else if (platform === "ios") {
  scriptName = "bundle:ios";
}

if (!scriptName) {
  console.error(
    "Invalid platform. Supported platforms are 'android' and 'ios'."
  );
  process.exit(1);
}

const child = spawn("yarn", ["workspace", packageName, "run", scriptName]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`Bundle script exited with code ${code}`);
});
