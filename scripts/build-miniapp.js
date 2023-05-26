#!/usr/bin/env node

/**
 * Node.js script for automating the process of building a mini app in a CI environment based on git tags.
 *
 * This script performs the following actions:
 * - Extracts the git tag from the command-line argument passed when running the script.
 * - Parses and validates the git tag format. The expected format is <packageName>-<platform>@<version>.
 * - Based on the parsed git tag, it identifies the package name, the target platform.
 * - Determines the appropriate build command for the specified platform.
 * - Executes a series of shell commands to run the build for specific platform
 *   and move the output to the 'build' directory in the root of the monorepo.
 *
 * The resulting build output can be used to release the built mini app.
 *
 * Note: This script assumes the presence of a valid git tag as an argument when running the script.
 */

const path = require("path");
const { spawn } = require("child_process");

function verifyGitTagFormat(gitTag) {
  const gitTagPattern = /^([\w-]+)-(\w+)@([\d.]+)$/;
  const match = gitTag.match(gitTagPattern);

  if (!match) {
    console.error(
      "Invalid git tag format. Expected format: <packageName>-<platform>@<version>"
    );
    process.exit(1);
  }

  return {
    packageName: match[1],
    platform: match[2],
    version: match[3],
  };
}

function getScriptName(targetPlatform) {
  if (targetPlatform === "android") {
    return "bundle:android";
  }
  if (targetPlatform === "ios") {
    return "bundle:ios";
  }

  console.error(`Unsupported platform: ${targetPlatform}`);
  process.exit(1);
}

function runShellCommands(commands) {
  const command = commands.shift();
  const child = spawn(command.cmd, command.args);

  child.stdout.on("data", (data) => {
    console.log(String(data));
  });

  child.stderr.on("data", (data) => {
    console.error(String(data));
  });

  child.on("close", (code) => {
    if (code !== 0) {
      process.exit(1);
    }

    if (commands.length > 0) {
      runShellCommands(commands);
    }
  });
}

function buildMiniApp(gitTag) {
  const { packageName, platform } = verifyGitTagFormat(gitTag);

  const scriptName = getScriptName(platform);

  const buildPath = path.join(
    "packages",
    packageName,
    "build",
    "outputs",
    platform,
    "remotes"
  );

  const commands = [
    { cmd: "yarn", args: ["workspace", packageName, "run", scriptName] },
    { cmd: "mv", args: [buildPath, "build"] },
  ];

  runShellCommands(commands);
}

buildMiniApp(process.argv[2]);
