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

export default Repack.defineRspackConfig(({mode, platform}) => {
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
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions({enablePackageExports: true}),
      // Expose host's node_modules as an absolute resolution root so that
      // shared-module fallbacks (Module Federation) requested from sibling
      // workspace packages — e.g. sdk's useFlashAnimation.ts importing the
      // host-owned react-native-reanimated — resolve correctly. Without this,
      // node resolution walks up from packages/sdk and never reaches
      // host/node_modules. Mirrors the modules config in the mini apps.
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    output: {
      uniqueName: 'sas-host',
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
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        dts: false,
        remotes: {
          auth: `auth@http://localhost:9003/${platform}/mf-manifest.json`,
          trading: `trading@http://localhost:9001/${platform}/mf-manifest.json`,
          wallet: `wallet@http://localhost:9002/${platform}/mf-manifest.json`,
        },
        shared: getSharedDependencies({eager: true}),
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
});
