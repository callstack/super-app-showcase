import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import {getSharedDependencies} from 'super-app-showcase-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default env => {
  const {mode, platform} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'sas-booking',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules({inline: true}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'booking',
        filename: 'booking.container.js.bundle',
        dts: false,
        exposes: {
          './App': './src/navigation/MainNavigator',
          './UpcomingScreen': './src/screens/UpcomingScreen',
        },
        remotes: {
          auth: `auth@http://localhost:9003/${platform}/mf-manifest.json`,
        },
        shared: getSharedDependencies({eager: false}),
      }),
      new Repack.plugins.CodeSigningPlugin({
        enabled: mode === 'production',
        privateKeyPath: path.join('..', '..', 'code-signing.pem'),
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
