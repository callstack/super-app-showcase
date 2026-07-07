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

export default Repack.defineRspackConfig(({mode}) => {
  return {
    mode,
    context: __dirname,
    // Ignore benign "Critical dependency" warnings from reanimated/worklets'
    // dynamic require()s that Rspack can't statically extract. Neither path
    // runs in the app bundle under Re.Pack:
    //   - worklets bundleMode/metroOverrides: Metro-only runtime APIs
    //   - reanimated jestUtils: only executes when IS_JEST is true
    // Use the {module} form — a bare RegExp is matched against the warning
    // message, not the module path, so it would never match here.
    // Also ignore @gorhom/bottom-sheet's optional require('@shopify/flash-list')
    // (wrapped in try/catch) — flash-list isn't installed and the component
    // falls back to a regular list when it's absent.
    ignoreWarnings: [
      {module: /react-native-worklets[\\/]src[\\/]bundleMode[\\/]metroOverrides/},
      {module: /react-native-reanimated[\\/]src[\\/]jestUtils/},
      {module: /@gorhom[\\/]bottom-sheet[\\/].*BottomSheetFlashList/},
    ],
    entry: {},
    resolve: {...Repack.getResolveOptions({enablePackageExports: true})},
    output: {
      uniqueName: 'sas-auth',
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {},
          },
          type: 'javascript/auto',
        },
        ...Repack.getAssetTransformRules({inline: true}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'auth',
        filename: 'auth.container.js.bundle',
        dts: false,
        exposes: {
          './AccountScreen': './src/screens/AccountScreen',
          './SignInScreen': './src/screens/SignInScreen',
          './AuthProvider': './src/providers/AuthProvider',
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
});
