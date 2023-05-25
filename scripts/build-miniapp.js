#!/usr/bin/env node

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
