const deps = {
  react: {
    /**
     * singleton means that only one version of the module is loaded.
     */
    singleton: true,
    /**
     * eager means that the module is added into the initial bundle and will not be loaded later.
     * All shared module in the host app should be eager. In remote containers it depends on build proposes.
     * If bundle should work as a standalone application, then it should be eager.
     * Here is STANDALONE env variable shows if bundle is standalone and eager should be enabled.
     */
    eager: true,
    /**
     * requiredVersion is used to match requested modules in bundle.
     * It's recommended to use the same version as in the host app.
     */
    requiredVersion: "18.2.0",
  },
  "react-native": {
    singleton: true,
    eager: true,
    requiredVersion: "0.71.8",
  },
  "@react-navigation/native": {
    singleton: true,
    eager: true,
    requiredVersion: "6.0.14",
  },
  "@react-navigation/native-stack": {
    singleton: true,
    eager: true,
    requiredVersion: "6.9.2",
  },
  "@react-navigation/material-bottom-tabs": {
    singleton: true,
    eager: true,
    requiredVersion: "6.2.5",
  },
  "react-native-paper": {
    singleton: true,
    eager: true,
    requiredVersion: "5.0.0-rc.10",
  },
  "@react-native-async-storage/async-storage": {
    singleton: true,
    eager: true,
    requiredVersion: "1.17.11",
  },
};

export { deps };
