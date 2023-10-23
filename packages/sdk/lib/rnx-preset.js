const addSdkCapability = ({ capabilites, capabilityName, sdkVersion }) => {
  return {
    [capabilityName]: {
      name: "super-app-showcase-sdk",
      version: sdkVersion,
      capabilities: Object.keys(capabilites),
    },
    ...capabilites,
  };
};

const createSdkPreset = (profiles) => {
  const presetEntries = Object.entries(profiles).map(([version, profile]) => {
    return [
      version,
      addSdkCapability({
        capabilites: profile,
        capabilityName: "super-app",
        sdkVersion: version,
      }),
    ];
  });

  return Object.fromEntries(presetEntries);
};

module.exports = createSdkPreset({
  "0.0.1": require("./profiles/0.0.1.json"),
});
